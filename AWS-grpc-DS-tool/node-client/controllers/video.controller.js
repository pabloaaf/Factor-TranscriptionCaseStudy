const { videoService: service } = require('../services');

const processVideo = async (req, res) => {
    let message = {
        fileRoute: req.body.file // "/assets/audios/" + "2830-3980-0043.wav"
    };

    let tperfect = req.body.perfect;

    // No timeout
    res.status(200).json(message);

    let test = req.body.file.split('.')[0];

    let staticsInfo = {
        finalName: 'v-'+Date.now()+'-'+test,
        video: '/assets/classes/',
        audio: '/assets/audios/',
        videoExtension: 'mp4',
        audioExtension: 'wav',
        picExtension: 'png'
    };

    // Extract audio
    await service.splitAudio(staticsInfo.video+message.fileRoute, staticsInfo.audio+staticsInfo.finalName+'-aws.'+staticsInfo.audioExtension, 8000);
    await service.splitAudio(staticsInfo.video+message.fileRoute, staticsInfo.audio+staticsInfo.finalName+'-deepspeech.'+staticsInfo.audioExtension, 16000);

    //AWS method
    let startTimeAWS = process.hrtime();
    console.log("Send audio to S3 bucket");
    let name = await service.storeAudioToBucket(staticsInfo.audio+staticsInfo.finalName+'-aws.'+staticsInfo.audioExtension);
    console.log("Transcribe job");
    console.log(name);
    let transcription_result = await service.transcribeAudio(name);
    console.log("Start transcription time");
    let response;
    do {
        await new Promise(r => setTimeout(r, 10000));
        response = await service.lookupTranscribeCompletion(transcription_result);
        // waiting;
    }
    while (response.TranscriptionJob.TranscriptionJobStatus === "IN_PROGRESS");

    let route = response.TranscriptionJob.Transcript.TranscriptFileUri.split("/");
    let nameS3 = route[route.length - 1];
    let audio = await service.retrieveTranscribedAudio(nameS3);

    let elapsedSecondsAWS = parseHrtimeToSeconds(process.hrtime(startTimeAWS));
    let jsonAWS = JSON.parse(audio.Body);

    // DeepSpeech method
    let startTimeDS = process.hrtime();
    let jsonDeepSpeech = await service.transcribeDeepSpeech(staticsInfo.audio+staticsInfo.finalName+'-deepspeech.'+staticsInfo.audioExtension);
    let elapsedSecondsDS = parseHrtimeToSeconds(process.hrtime(startTimeDS));

    // compare time results
    if(elapsedSecondsAWS>=elapsedSecondsDS){
        console.log("DeepSpeech is fast by " + (elapsedSecondsAWS-elapsedSecondsDS)+ " seconds");
    } else {
        console.log("AWS is fast by " + (elapsedSecondsDS-elapsedSecondsAWS)+ " seconds");
    }


    // Preview Transcripts
    let tAWS = jsonAWS.results.transcripts[0].transcript;
    let tDS = jsonDeepSpeech.jsonTranscript;

    // Compare times
    let similarity_LD_AWS = await service.levenshteinDistance(tAWS, tperfect);
    let similarity_LD_DS = await service.levenshteinDistance(tDS, tperfect);

    let similarity_CD_AWS = await service.cosineSimilarity(tAWS, tperfect);
    let similarity_CD_DS = await service.cosineSimilarity(tDS, tperfect);

    let similarity_JW_AWS = await service.jaroWrinker(tAWS, tperfect);
    let similarity_JW_DS = await service.jaroWrinker(tDS, tperfect);

    // CSV Format ; delimiter
    console.log("File;Compute time;STT;Transcripts;Levenshtein Distance ABS;Levenshtein Distance % Similarity;Cosine Similarity;Jaro Wrinker");
    console.log(test+";"+elapsedSecondsAWS+";AWS;"+tAWS+";"+similarity_LD_AWS+";"+(1-(similarity_LD_AWS/tperfect.length))+";"+similarity_CD_AWS+";"+similarity_JW_AWS);
    console.log(test+";"+elapsedSecondsDS+";DeepSpeech;"+tDS+";"+similarity_LD_DS+";"+(1-(similarity_LD_DS/tperfect.length))+";"+similarity_CD_DS+";"+similarity_JW_DS);
};

const parseHrtimeToSeconds = (hrtime) => {
    let seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
    return seconds;
};

module.exports = {
    processVideo
};

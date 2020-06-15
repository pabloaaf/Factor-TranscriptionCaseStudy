import sys
import os
import logging
import argparse
import subprocess
import shlex
import numpy as np
import wavTranscriber

# Debug helpers
logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)


def transcriptionProcess(aggressive, audioLoc, modelLoc):
    logging.debug("Transcribing audio file: %s" % audioLoc)

    # Point to a path containing the pre-trained models & resolve ~ if used
    dirName = os.path.expanduser(modelLoc)

    logging.debug("dirName: %s" % dirName)

    # Resolve all the paths of model files
    output_graph, scorer = wavTranscriber.resolve_models(dirName)

    # Load output_graph, alpahbet and scorer
    model_retval = wavTranscriber.load_model(output_graph, scorer)

    if audioLoc is not None:
        title_names = ['Filename', 'Duration(s)', 'Inference Time(s)', 'Model Load Time(s)', 'Scorer Load Time(s)']
        print("\n%-30s %-20s %-20s %-20s %s" % (title_names[0], title_names[1], title_names[2], title_names[3], title_names[4]))

        inference_time = 0.0

        # Run VAD on the input file
        waveFile = audioLoc
        segments, sample_rate, audio_length = wavTranscriber.vad_segment_generator(waveFile, aggressive)
        transcripts = ""
        f = open(waveFile.rstrip(".wav") + ".txt", 'w')
        logging.debug("Saving Transcript @: %s" % waveFile.rstrip(".wav") + ".txt")

        for i, segment in enumerate(segments):
            # Run deepspeech on the chunk that just completed VAD
            logging.debug("Processing chunk %002d" % (i,))
            audio = np.frombuffer(segment, dtype=np.int16)
            output = wavTranscriber.stt(model_retval[0], audio, sample_rate)
            inference_time += output[1]
            logging.debug("Transcript: %s" % output[0])

            transcripts+=output[0]
            f.write(output[0] + " ")

        # Summary of the files processed
        f.close()

        # Extract filename from the full file path
        filename, ext = os.path.split(os.path.basename(waveFile))
        logging.debug("************************************************************************************************************")
        logging.debug("%-30s %-20s %-20s %-20s %s" % (title_names[0], title_names[1], title_names[2], title_names[3], title_names[4]))
        logging.debug("%-30s %-20.3f %-20.3f %-20.3f %-0.3f" % (filename + ext, audio_length, inference_time, model_retval[1], model_retval[2]))
        logging.debug("************************************************************************************************************")
        print("%-30s %-20.3f %-20.3f %-20.3f %-0.3f" % (filename + ext, audio_length, inference_time, model_retval[1], model_retval[2]))

        return transcripts
from concurrent import futures
import base64
import time 
import sys
import subprocess

import audioTranscript
import transcribe_pb2
import transcribe_pb2_grpc

import grpc

def transcribe(msg):
    print(msg)
    sys.stdout.flush()
    output = audioTranscript.transcriptionProcess(1, msg, "/models")

    print(output)
    sys.stdout.flush()
    return output

class TService(transcribe_pb2_grpc.TranscribeServiceServicer):
    
    def getTranscription(self, request, context):
        return transcribe_pb2.transcripts(jsonTranscript = transcribe(request.fileRoute))

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=2))
    transcribe_pb2_grpc.add_TranscribeServiceServicer_to_server(TService(),server)
    server.add_insecure_port('[::]:22222')
    server.start()
    try:
        while True:
            time.sleep(60*60*24)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serve()
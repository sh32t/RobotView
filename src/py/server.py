# -*- coding:utf-8 -*-
import socket
import time
import sys
import json

status = {
    "speed": 0,
    "wheel": {"fr": 0 ,"fl": 0, "br": 0, "bl": 0},
    "tube" : {"r":0,"l":0},
    "pump" : 0,
    "msg"  : ""
}

def setup_server():
    serversock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    serversock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    serversock.bind(("localhost",55000))
    serversock.listen(10)
    return serversock

def main():
    serversock = setup_server()

    print("Waiting for connections...")
    sys.stdout.flush()
    clientsock, client_address = serversock.accept()

    while True:
        status["speed"] += 1
        status["wheel"]["fr"] += 1
        status["wheel"]["fl"] += 1
        status["wheel"]["br"] += 1
        status["wheel"]["bl"] += 1
        status["tube"]["r"] += 1
        status["tube"]["l"] += 1
        status["pump"] += 1
        status["msg"] = "connecting..."
        str_status = json.dumps(status)
        clientsock.sendall(str_status)
        time.sleep(1)

    clientsock.close()

if __name__ == "__main__":
    main()


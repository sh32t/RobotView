# -*- coding:utf-8 -*-
import socket
import time
import sys

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

    status = 0

    while True:
        status += 1
        str_status = str(status)
        clientsock.sendall(bytes(str_status, encoding="utf-8"))
        time.sleep(1)

    clientsock.close()



if __name__ == "__main__":
    main()


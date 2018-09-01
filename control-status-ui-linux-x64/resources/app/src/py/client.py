# -*- coding:utf-8 -*-
import socket
import sys

def setup_client():
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect(("localhost", 55000))
    client.send("connect")
    return client 

def check_connect(response):
    response = client.recv(4096)
    return response == ""

def output_receive(str):
    print(str)
    sys.stdout.flush()

def main():
    client = setup_client()

    while True:
        response = client.recv(4096)
        if response == "":
            break
        output_receive(response)

if __name__ == "__main__":
    main()

#Andreas Berg

import requests
import json
from datetime import datetime as dt
rpc_user = 'andy'
rpc_pass = 'bob'
url = 'http://%s:%s@localhost:8332' % (rpc_user, rpc_pass)
headers = {'content-type': 'application/json'}
# Hämta hashvärdet på block nr 99# Tänk på att “params” är en lista med alla parametrar till anropet (här bara 1 parameter)
#"method": "getblockhash", "params": [99]
def getNetworkInfo():
    payload = {
        "method": "getnetworkinfo"
    }
    return requests.post(url, data=json.dumps(payload), headers=headers).json()
def getBlockChainInfo():
    payload = {
        "method": "getblockchaininfo"
    }
    return requests.post(url, data=json.dumps(payload), headers=headers).json()
def getBlock(hash):
    payload = {
        "method": "getblock",
        "params": [hash]
    }
    return requests.post(url, data=json.dumps(payload), headers=headers).json()
def getBlockHash(blocknumber):
    payload = {
        "method": "getblockhash",
        "params": [int(blocknumber)]
    }
    return requests.post(url, data=json.dumps(payload), headers=headers).json()["result"]

def getMempoolInfo():
    payload = {
        "method": "getmempoolinfo"
    }
    return requests.post(url, data=json.dumps(payload), headers=headers).json()

def getRawTransactions(transactionhash):
    payload = {
        "method": "getrawtransaction",
        "params": [transactionhash, 2 ]
    }
    return requests.post(url, data=json.dumps(payload), headers=headers).json()

def decodeRawTransaction(tx):
    payload = {
        "method": "decoderawtransaction",
        "params": [tx]
    }
    return requests.post(url, data=json.dumps(payload), headers=headers).json()


print("Bitcoin Edu utforskare")
print("======================================")
print("%-18s  %s" %("Antal block:", getBlockChainInfo()["result"]["blocks"]))
print("%-18s  %s%s" %("Storlek på disk:", round(getBlockChainInfo()["result"]["size_on_disk"]/(1024*1024), 2), " mb"))
print("%-18s  %s" %("Senaste block:", getBlockHash(getBlockChainInfo()["result"]["blocks"])))
print("%-18s  %s" %("Mempool (size):", getMempoolInfo()["result"]["size"]))
print("%-18s  %s" %("Connections:", getNetworkInfo()["result"]["connections"]))
print("======================================")
print("Meny")
print("1. Visa block (ange nr)")
print("2. Visa block (ange hash)")
print("3. Visa transkation")
print("4. Lista outputs för address")
print("Välj funktion:")
nbr = input()
if nbr == "1":
    print("Ange nr:")
    blockNbr = input()
    block = getBlock(getBlockHash(blockNbr))["result"]
    print("--------------------------------")
    print("%-10s  %s" %("Block hash:", block["hash"]))
    print("%-10s  %s" %("Prev. hash:", block["previousblockhash"]))
    print("%-10s  %s" %("Merkle root:", block["merkleroot"]))
    print("%-10s  %s" %("Height:", block["height"]))
    print("%-10s  %s" %("Tid:", dt.fromtimestamp(block["time"])))
    print("%-10s  %s" %("Difficulty:", block["difficulty"]))
    print("%-10s  %s" %("Transactions:", block["nTx"]))
    i = 1
    for tran in block["tx"]:
        print("  Tx%s: %s" %(i, tran))
        i += 1
elif nbr == "2":
    print("Ange hash:")
    hash = input()
    block = getBlock(hash)["result"]
    print("--------------------------------")
    print("%-10s  %s" %("Block hash:", block["hash"]))
    print("%-10s  %s" %("Prev. hash:", block["previousblockhash"]))
    print("%-10s  %s" %("Merkle root:", block["merkleroot"]))
    print("%-10s  %s" %("Height:", block["height"]))
    print("%-10s  %s" %("Tid:", dt.fromtimestamp(block["time"])))
    print("%-10s  %s" %("Difficulty:", block["difficulty"]))
    print("%-10s  %s" %("Transactions:", block["nTx"]))
    i = 0
    for tran in block["tx"]:
        print("  Tx%s: %s" %(i, tran))
        i += 1
elif nbr == "3":
    print("Ange transaktionshash:")
    hash = input()
    transaction = getRawTransactions(hash)["result"]
    print("--------------------------------")
    print("%-10s  %s" %("Txid (hash):", transaction["txid"]))
    print("%-10s  %s" %("Med i block:", transaction["blockhash"]))
    print("%-10s  %s" %("Inputs:", len(transaction["vin"])))
    print("%-10s  %s" %("Outputs:", len(transaction["vout"])))
    i = 0
    for obj in transaction["vout"]:
        amount = obj["value"]
        if obj["scriptPubKey"]["type"] == "nulldata":
            print("  output%s: Ingen address" %(i))
        else:
            for address in obj["scriptPubKey"]["addresses"]:
                print("  output%s: %s BTE till adress: %s" %(i, format(amount, ".6f"), address ))
        i += 1

elif nbr == "4":
    print("Ange adress:")
    inputAdress = input()

    print("--------------------------------")
    print("Söker efter adress %s"%(inputAdress))
    print("Söker i de 2000 senaste blocken: %s till och med %s" %(getBlockChainInfo()["result"]["blocks"]-2000, getBlockChainInfo()["result"]["blocks"]))
    i=0
    n = 200
    for block in range(getBlockChainInfo()["result"]["blocks"]-2000, getBlockChainInfo()["result"]["blocks"]):
        for tx in getBlock(getBlockHash(block))["result"]["tx"]:
            for obj in getRawTransactions(tx)["result"]["vout"]:
                amount = obj["value"]
                if obj["scriptPubKey"]["type"] == "nulldata":
                    pass
                else:
                    for address in obj["scriptPubKey"]["addresses"]:
                        if address == inputAdress:
                            print("Block: %s, Tx: %s" %(block, tx ))
                            print(" %s BTE" %(format(amount, ".6f")))
        i += 1
        if i == n:
            print(block)
            n+=200

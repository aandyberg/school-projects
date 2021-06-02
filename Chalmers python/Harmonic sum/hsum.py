import sys

def hSum(num_terms):
    sum = 0
    n = 1
    for x in range(num_terms):
        sum += (1.0/n)
        n += 1
    return sum

def main():
    parameter = int(sys.argv[1])
    n = 0
    while n < parameter:
        print(f"{n} {hSum(n)}")
        n +=1


main()

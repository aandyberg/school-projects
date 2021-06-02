import wordfreq
import sys
import urllib.request

def main(stopwords, file, number):
    stopwords_file = open(stopwords, encoding="utf-8")
    tokenized_stopwords = wordfreq.tokenize(stopwords_file)
    stopwords_file.close()

    if file.startswith("http://") or file.startswith("https://"):
        response = urllib.request.urlopen(file)
        lines = response.read().decode("utf-8").splitlines()
        tokenized_file = wordfreq.tokenize(lines)
    else:
        inp_file = open(file, encoding="utf-8")
        tokenized_file = wordfreq.tokenize(inp_file)
        inp_file.close()

    dict = wordfreq.countWords(tokenized_file, tokenized_stopwords)

    wordfreq.printTopMost(dict, int(number))

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], sys.argv[3])

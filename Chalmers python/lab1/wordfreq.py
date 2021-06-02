def tokenize(lines):
    words = []
    for line in lines:
        start = 0
        end = 0
        while start < len(line):
            if start < len(line) and line[start].isspace():
                start += 1
                end = start

            elif start < len(line) and line[start].isalpha():
                while end < len(line) and line[end].isalpha():
                    end += 1
                word = line[start:end]
                words.append(word.lower())
                start = end
            elif start < len(line) and line[start].isdigit():
                while end < len(line) and line[end].isdigit():
                    end += 1
                word = line[start:end]
                words.append(word.lower())
                start = end
            else:
                end += 1
                word = line[start:end]
                words.append(word)
                start = end
    return words

def countWords(words, stopWords):
    dict = {}
    for word in words:
        if word not in stopWords:
            if word not in dict:
                dict[word] = 1
            else:
                dict[word] += 1
    return dict

def printTopMost(frequencies, n):
    for key, value in sorted(frequencies.items(), key=lambda x: x[1], reverse=True)[:n]:
        print(key.ljust(20) + str(value).rjust(5))

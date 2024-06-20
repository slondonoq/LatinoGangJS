import sys
from antlr4 import *
from grammar.gen.LatinoGrammarLexer import LatinoGrammarLexer
from grammar.gen.LatinoGrammarParser import LatinoGrammarParser
from LatinoToJs import LatinoToJs

input_text = sys.stdin.read()
lexer = LatinoGrammarLexer(InputStream(input_text))
stream = CommonTokenStream(lexer)
parser = LatinoGrammarParser(stream)

tree = parser.source()

walker = ParseTreeWalker()
walker.walk(LatinoToJs(), tree)
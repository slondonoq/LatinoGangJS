import sys

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from antlr4 import *
from grammar.gen.LatinoGrammarLexer import LatinoGrammarLexer
from grammar.gen.LatinoGrammarParser import LatinoGrammarParser
from LatinoToJs import LatinoToJs
import io
from contextlib import redirect_stdout

app = FastAPI()

class TextInput(BaseModel):
    input: str

@app.post("/translate")
async def translate_latino2js(input:TextInput):
    try:
        # input_text = open("inputs/05.in", "r").read()
        # input_text = sys.stdin.read()

        input_text = input.input
        lexer = LatinoGrammarLexer(InputStream(input_text))
        stream = CommonTokenStream(lexer)
        parser = LatinoGrammarParser(stream)

        tree = parser.source()

        walker = ParseTreeWalker()
        output = io.StringIO()
        with redirect_stdout(output):
            walker.walk(LatinoToJs(), tree)
        print(output.getvalue())
        return {"result": output.getvalue()}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
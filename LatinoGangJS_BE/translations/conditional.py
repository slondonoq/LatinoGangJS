from grammar.gen.LatinoGrammarParser import LatinoGrammarParser

def enterConditional(latinoToJSInstance, ctx: LatinoGrammarParser.ConditionalBlockContext):
    exp = ctx.exp().getText()
    string_replacement = 'if ?~exp {\n' if exp[0] == '(' and exp[-1] == ')' else 'if (?~exp) {\n'

    for _ in ctx.sentence():
        string_replacement += '?~sentence'

    string_replacement += latinoToJSInstance.indentationStack[-1]*'\t' + '}'

    for _ in ctx.altCondition():
        string_replacement += '\n?~altCondition'

    if ctx.noCondition():
        string_replacement += '\n?~noCondition'

    latinoToJSInstance.indentationStack.append(latinoToJSInstance.indentationStack[-1]+1)
    latinoToJSInstance.jsCode = latinoToJSInstance.jsCode.replace('?~conditionalBlock', string_replacement)

def exitConditional(latinoToJSInstance, ctx: LatinoGrammarParser.ConditionalBlockContext):
    latinoToJSInstance.indentationStack.pop()


def enterAltConditional(latinoToJSInstance, ctx: LatinoGrammarParser.AltConditionContext):
    exp = ctx.exp().getText()
    #Use last elem in indentation stack -1 as the conditional block exit hasn't been reached at this point
    replacement_string = (latinoToJSInstance.indentationStack[-1]-1)*'\t'
    replacement_string += 'else if ?~exp {\n' if exp[0] == '(' and exp[-1] == ')' else 'else if (?~exp) {\n'

    for _ in ctx.sentence():
        replacement_string += '?~sentence'

    replacement_string += (latinoToJSInstance.indentationStack[-1]-1)*'\t' + '}'
    latinoToJSInstance.indentationStack.append(latinoToJSInstance.indentationStack[-1])
    latinoToJSInstance.jsCode = latinoToJSInstance.jsCode.replace('?~altCondition', replacement_string, 1)


def exitAltConditional(latinoToJSInstance, ctx: LatinoGrammarParser.AltConditionContext):
    latinoToJSInstance.indentationStack.pop()


def enterNoConditional(latinoToJSInstance, ctx: LatinoGrammarParser.NoConditionContext):
    # Use last elem in indentation stack -1 as the conditional block exit hasn't been reached at this point
    replacement_string = (latinoToJSInstance.indentationStack[-1]-1)*'\t' + 'else {\n'

    for _ in ctx.sentence():
        replacement_string += '?~sentence'

    replacement_string += (latinoToJSInstance.indentationStack[-1] - 1) * '\t' + '}'
    latinoToJSInstance.indentationStack.append(latinoToJSInstance.indentationStack[-1])
    latinoToJSInstance.jsCode = latinoToJSInstance.jsCode.replace('?~noCondition', replacement_string, 1)

def exitNoConditional(latinoToJSInstance, ctx: LatinoGrammarParser.NoConditionContext):
    latinoToJSInstance.indentationStack.pop()

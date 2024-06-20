from grammar.gen.LatinoGrammarParser import LatinoGrammarParser

def enterSwitch(latinoToJSInstance, ctx: LatinoGrammarParser.SwitchBlockContext):
    exp = ctx.exp().getText()
    replacement_string = 'switch ?~exp {\n' if exp[0] == '(' and exp[-1] == ')' else 'switch (?~exp) {\n'
    replacement_string += '?~switchCases\n' + latinoToJSInstance.indentationStack[-1]*'\t'+'}'
    latinoToJSInstance.indentationStack.append(latinoToJSInstance.indentationStack[-1]+1)
    latinoToJSInstance.jsCode = latinoToJSInstance.jsCode.replace('?~switchBlock', replacement_string, 1)

def exitSwitch(latinoToJSInstance, ctx: LatinoGrammarParser.SwitchBlockContext):
    latinoToJSInstance.indentationStack.pop()

def enterSwitchCases(latinoToJSInstance, ctx: LatinoGrammarParser.SwitchCasesDefContext):
    init_case = ''
    if ctx.parentCtx.getRuleIndex() == LatinoGrammarParser.RULE_switchCasesDef:
        # init_case += '\t'*latinoToJSInstance.indentationStack[-1]+'break;\n'
        latinoToJSInstance.indentationStack.pop()
    if len(ctx.CASE())>0:
        for i in range(len(ctx.CASE())):
            init_case += '\t'*latinoToJSInstance.indentationStack[-1] + f'case {ctx.exp(i).getText()}:\n'

    elif ctx.DEF_CASE():
        init_case += '\t'*latinoToJSInstance.indentationStack[-1]+f'default:\n'

    for _ in ctx.sentence():
        init_case += '?~sentence'
    init_case += '\t'*(latinoToJSInstance.indentationStack[-1]+1)+'break;\n'
    for _ in ctx.switchCasesDef():
        init_case += '?~switchCases'

    latinoToJSInstance.jsCode = latinoToJSInstance.jsCode.replace('?~switchCases', init_case, 1)
    latinoToJSInstance.indentationStack.append(latinoToJSInstance.indentationStack[-1]+1)

def exitSwitchCases(latinoToJSInstance, ctx: LatinoGrammarParser.SwitchCasesDefContext):
    # TODO: check the string concat below, I'm not getting when it's used, so I haven't been able to replace it
    if len(ctx.switchCasesDef())==0:
        # latinoToJSInstance.jsCode += '\t'*latinoToJSInstance.indentationStack[-1]+'break;\n'
        latinoToJSInstance.indentationStack.pop()

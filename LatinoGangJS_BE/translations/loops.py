


def enterWhileBlockRule(self, ctx):
    exp = ctx.exp().getText()

    string_replacement = 'while ?~exp {\n' if exp[0] == '(' and exp[-1] == ')' else 'while (?~exp) {\n'
    for _ in ctx.sentence():
        string_replacement += '?~sentence'

    string_replacement += self.indentationStack[-1]*'\t' + '}'

    self.indentationStack.append(self.indentationStack[-1]+1)
    self.jsCode = self.jsCode.replace('?~whileBlock', string_replacement, 1)

def exitWhileBlockRule(self, ctx):
    self.indentationStack.pop()

def enterDoWhileBlockRule(self, ctx):
    exp = ctx.exp().getText()
    string_to_replace = 'do {\n'
    for _ in ctx.sentence():
        string_to_replace += '?~sentence'

    string_to_replace += self.indentationStack[-1]*'\t' + '}'
    string_to_replace += ' while ?~exp' if exp[0] == '(' and exp[-1] == ')' else ' while (?~exp)'

    self.indentationStack.append(self.indentationStack[-1]+1)
    self.jsCode = self.jsCode.replace('?~doWhile', string_to_replace, 1)

def exitDoWhileBlockRule(self, ctx):
    self.indentationStack.pop()

def enterForBlockRule(self, ctx):
    is_assig = ctx.ASSIGN() != None
    string_replacement = ''

    variable = ctx.assignableID().getText()
    if is_assig and variable not in self.symbolArray:
        self.symbolArray.append(variable)
        string_replacement += f'for (let {ctx.assignableID().getText()} {ctx.ASSIGN().getText()} ?~exp; ?~exp; ?~noTab?~sentence)'+' {\n'
    elif is_assig and variable in self.symbolArray:
        string_replacement += f'for ({ctx.assignableID().getText()}{ctx.ASSIGN().getText()}?~exp; ?~exp; ?~noTab?~sentence)' + ' {\n'
    elif not is_assig:
        string_replacement += f'for ({ctx.assignableID().getText()}{ctx.ASSIGN_OP().getText()}?~exp; ?~exp; ?~noTab?~sentence)'+' {\n'

    for i in range(1, len(ctx.sentence())):
        string_replacement += '?~sentence'

    string_replacement += self.indentationStack[-1]*'\t' + '}'

    self.indentationStack.append(self.indentationStack[-1]+1)

    self.jsCode = self.jsCode.replace('?~forBlock', string_replacement, 1)


def exitForBlockRule(self, ctx):
    self.indentationStack.pop()

def enterForRangeBlockRule(self, ctx):
    inicio = False
    fin = False
    salto = False
    string_replacement = ''

    if len(ctx.exp()) == 1:
        inicio = True
    elif len(ctx.exp()) == 2:
        inicio = True
        fin = True
    elif len(ctx.exp()) == 3:
        inicio = True
        fin = True
        salto = True

    if not self.rangeCreated:
        string_replacement += 'function range(start, end, step) {\n'
        string_replacement += '    if (end === undefined) {\n'
        string_replacement += '        end = start;\n'
        string_replacement += '        start = 0;\n'
        string_replacement += '    }\n'
        string_replacement += '    if (step === undefined) {\n'
        string_replacement += '        step = 1;\n'
        string_replacement += '    }\n'
        string_replacement += '    let result = [];\n'
        string_replacement += '    if (step > 0) {\n'
        string_replacement += '        for (let i = start; i < end; i += step) {\n'
        string_replacement += '            result.push(i);\n'
        string_replacement += '        }\n'
        string_replacement += '    } else {\n'
        string_replacement += '        for (let i = start; i > end; i += step) {\n'
        string_replacement += '            result.push(i);\n'
        string_replacement += '        }\n'
        string_replacement += '    }\n'
        string_replacement += '    return result;\n'
        string_replacement += '}\n'

        self.rangeCreated = True

    item_iter = ctx.ID().getText()

    if inicio and fin and salto:
        string_replacement += f'for (let {item_iter} of range(?~exp, ?~exp, ?~exp))'
        string_replacement += '{\n'
    elif inicio and fin:
        string_replacement += f'for (let {item_iter} of range(?~exp, ?~exp))'
        string_replacement += '{\n'
    elif inicio:
        string_replacement += f'for (let {item_iter} of range(?~exp))'
        string_replacement += '{\n'

    for _ in ctx.sentence():
        string_replacement += '?~sentence'

    string_replacement += self.indentationStack[-1]*'\t' + '}'
    self.indentationStack.append(self.indentationStack[-1]+1)
    self.jsCode = self.jsCode.replace('?~rangedForBlock', string_replacement, 1)

def exitForRangeBlockRule(self, ctx):
    self.indentationStack.pop()
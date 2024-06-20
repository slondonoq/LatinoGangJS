def enterOpBuiltInTipoRule(self, ctx):

    operation = ctx.OP_BUILTIN_FUNCS_ARG().getText()
    if operation == 'anumero':
        operation = 'parseFloat(?~exp)'
    elif operation == 'acadena':
        operation = 'String(?~exp)'
    elif operation == 'alogico':
        operation = 'Boolean(?~exp)'
    elif operation == 'tipo':
        operation = 'typeof(?~exp)'

    self.jsCode = self.jsCode.replace('?~opBT', operation)

def enterBuiltInFuncSentenceRule(self,ctx):
    string_replacement = ''
    if ctx.BUILTIN_FUNC_SINGLE_ARG():
        string_replacement += 'console.log(?~exp)'
    elif ctx.BUILTIN_FUNC_NO_ARG():
        string_replacement += 'console.clear()'
    elif ctx.BUILTIN_FUNC_MULTI_ARG():
        string_replacement += 'console.log(?~PrintArgs)'

    self.jsCode = self.jsCode.replace('?~BI_Func', string_replacement)

def enterFunctionBlockRule(self, ctx):
    ids = [i.getText() for i in ctx.ID()]
    string_replacement = 'function '

    for i in range(len(ids)):
        if i == 0:
            string_replacement += ids[i] + '('
        else:
            string_replacement += f'{ids[i]}, ' if i < len(ids) - 1 else ids[i]

    string_replacement += ') {\n'

    for _ in ctx.sentence():
        string_replacement += '?~sentence'

    string_replacement += self.indentationStack[-1]*'\t' + '}'
    self.indentationStack.append(self.indentationStack[-1] + 1)

    self.jsCode = self.jsCode.replace('?~functionBlock', string_replacement, 1)

def enterFunctionReturnRule(self, ctx):
    if '?~return' in self.jsCode:
        self.jsCode = self.jsCode.replace('?~return', f'return ?~exp')
    else:
        self.jsCode += 'return ?~exp'

def exitFunctionBlockRule(self, ctx):
    self.indentationStack.pop()


def enterFunctionCallRule(self, ctx):
    replacement_string = ''

    if '?~funCall' in self.jsCode:
        if ctx.optionalAssignableExpConcat().getText() == '':
            self.jsCode = self.jsCode.replace('?~funCall', replacement_string)
        else:
            n_expressions = len(ctx.optionalAssignableExpConcat().assignableExp())
            for i in range(n_expressions):
                replacement_string += '?~exp, ' if i < n_expressions-1 else '?~exp'
            self.jsCode = self.jsCode.replace('?~funCall', f'{replacement_string}')
    elif '?~nestedFunCall' in self.jsCode:
        self.jsCode = self.jsCode.replace('?~nestedFunCall', '')
    else:
        n_expressions = len(ctx.optionalAssignableExpConcat().assignableExp())
        for i in range(n_expressions):
            replacement_string += '?~exp, ' if i < n_expressions - 1 else '?~exp'
        
        self.jsCode += f'({replacement_string})'


def enterAnonymousFuncDefRule(self, ctx):
    expression = 'function ('
    ids = [i.getText() for i in ctx.ID()]
    for i in range(len(ids)):
        expression += f'{ids[i]}, ' if i < len(ids) - 1 else f'{ids[i]}'
    expression += ') { \n'
    n_sentences = len(ctx.sentence())

    for i in range(n_sentences):
        expression += '?~sentence'
    expression += self.indentationStack[-1]*'\t' + '}'
    self.indentationStack.append(self.indentationStack[-1] + 1)
    self.jsCode = self.jsCode.replace('?~anonFunc', expression)


def exitAnonymousFuncDefRule(self, ctx):
    self.indentationStack.pop()
    

def defineArgsPrint(self, ctx):
    args = ctx.getText()
    
    if len(args) <= 4:
        if '%i' in args or '%d' in args:
            self.jsCode = self.jsCode.replace('?~PrintArgs', 'parseInt(?~skip?~exp)')
        elif '%f' in args:
            self.jsCode = self.jsCode.replace('?~PrintArgs', 'parseFloat(?~skip?~exp)')
        elif '%o' in args or '%x' in args:
            self.jsCode = self.jsCode.replace('?~PrintArgs', 'parseInt(?~skip?~exp, ' + ('8' if '%o' in args else '16') + ')')
        elif '%%' in args:
            self.jsCode = self.jsCode.replace('?~PrintArgs', '?~skip?~exp /* no hay una traduccion directa */ ')
        elif '%c' in args:
            self.jsCode = self.jsCode.replace('?~PrintArgs', 'String.fromCharCode(?~skip?~exp)')
        elif '%s' in args:
            self.jsCode = self.jsCode.replace('?~PrintArgs', '(?~skip?~exp).toString()')
        elif '%e' in args:
            self.jsCode = self.jsCode.replace('?~PrintArgs', '/* Error: Expected number \n the translate will be like this: \n (?~skip?~exp).toExponential()\n */')
    else:
        num_arg = args.count('%')
        expression = 'String.fromCharCode(?~skip?~exp'
        
        for i in range(num_arg-1):
            expression += ', ?~exp'
        expression += ')'
        self.jsCode = self.jsCode.replace('?~PrintArgs', expression)
    
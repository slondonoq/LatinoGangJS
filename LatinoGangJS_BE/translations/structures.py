def enterListDefRule(self, ctx):
    string_replacement = '['
    elements = [i.getText() for i in ctx.optAssigExpConcatWithTrail().assignableExp()]

    for i in range(len(elements)):
        if elements[i] != '':
            string_replacement += '?~exp, ' if i < len(elements)-1 else '?~exp'

    string_replacement += ']'

    if '?~listDef' in self.jsCode:
        self.jsCode = self.jsCode.replace('?~listDef', string_replacement)
    else:
        self.jsCode += string_replacement

def enterDictDefRule(self, ctx):
    string_replacement = '{\n'
    self.indentationStack.append(self.indentationStack[-1]+1)
    expressions = ctx.exp()

    for i in range(len(expressions)):
        exp_terminal = expressions[i].terminal()
        is_valid_real = exp_terminal.REAL()
        is_valid_string = exp_terminal.STRING()
        is_valid_id = exp_terminal.ID() and len(exp_terminal.assignableIDModifiers()) == 0 and not exp_terminal.functionCall()
        # JS only accepts one value: string, number or id to define dicts
        if not expressions[i].binaryOp() and (is_valid_id or is_valid_string or is_valid_real):
            string_replacement += (self.indentationStack[-1])*'\t' + '?~exp : ?~exp'
            string_replacement += ',\n' if i < len(ctx.exp())-1 else '\n'
        else:
            string_replacement += (self.indentationStack[-1])*'\t'
            string_replacement += '/* JS sólo acepta un valor como key válido; este valor puede ser una cadena, un '
            string_replacement += 'número (sin signo) \n' + (self.indentationStack[-1])*'\t'
            string_replacement += 'o un identificador (sin accesos a listas, propiedades o '
            string_replacement += 'llamados de funciones).\n' + (self.indentationStack[-1])*'\t'
            string_replacement += 'Valor y llave no aceptados: ?~exp, ?~exp */\n'

    # At this point the extra indentation hasn't been removed, thus we use -1
    string_replacement += (self.indentationStack[-1]-1)*'\t' + '}'

    self.jsCode = self.jsCode.replace('?~dictDef', string_replacement)

def exitDictDefRule(self, ctx):
    self.indentationStack.pop()

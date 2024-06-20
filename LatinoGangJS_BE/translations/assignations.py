
def enterAssignationSentence(LatinoToJSInstance, ctx):
    variable = ctx.assignableID().getText()
    is_assig = bool(ctx.assig().ASSIGN())
    string_replacement = ''
    
    if is_assig and variable not in LatinoToJSInstance.symbolArray:
        LatinoToJSInstance.symbolArray.append(variable)
        string_replacement += 'let '

    if variable:
        string_replacement += variable

    string_replacement += '?~assignation'

    LatinoToJSInstance.jsCode = LatinoToJSInstance.jsCode.replace('?~assig-sentence', string_replacement, 1)

def enterAssignationRule(LatinoToJSInstance, ctx):
    variables = ctx.assignableID()
    operator = ctx.ASSIGN().getText() if ctx.ASSIGN() else ctx.ASSIGN_OP().getText()
    assignable_expressions = ctx.assignableExp()
    string_replacement = ''
    there_is_anonymous_func = False

    for i in range(len(variables)+1):
        if i > 0:
            string_replacement += ', ?~assigID'
        
            if (variables[i-1].ID().getText() not in LatinoToJSInstance.symbolArray
                    and not variables[i-1].assignableIDModifiers()):

                LatinoToJSInstance.symbolArray.append(variables[i-1].ID().getText())

        if len(assignable_expressions) > i:
            string_replacement += f' {operator} ?~exp'
            if assignable_expressions[i-1].anonymousFuncDef():
                there_is_anonymous_func = True

    if not '?~noEnd' in LatinoToJSInstance.jsCode and not there_is_anonymous_func:
        string_replacement += ';\n'
    elif there_is_anonymous_func:
        string_replacement += '\n'

    LatinoToJSInstance.jsCode = LatinoToJSInstance.jsCode.replace('?~assignation', string_replacement, 1)

    if '?~noEnd' in LatinoToJSInstance.jsCode:
        LatinoToJSInstance.jsCode = LatinoToJSInstance.jsCode.replace('?~noEnd', '', 1)

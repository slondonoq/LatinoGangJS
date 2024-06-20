from grammar.gen.LatinoGrammarListener import LatinoGrammarListener
from grammar.gen.LatinoGrammarParser import LatinoGrammarParser
from translations.assignations import *
from translations.functions import *
from translations.structures import *
from translations.conditional import *
from translations.switch import *
from translations.loops import *


class LatinoToJs(LatinoGrammarListener):

    def __init__(self):
        self.symbolArray = []  # Used to keep track of defined variables
        self.indentationStack = [0]  # Use to keep indentation levels when nesting blocks
        self.jsCode = ''
        self.passSemiColon = [';', '/', '}','\n']
        self.boolean_and_null_translation = {
            'verdadero': 'true', '"verdadero"': '"true"',
            'cierto': 'true',
            'falso': 'false',
            'nulo': 'null',
        }
        self.rangeCreated = False
        self.infor = False

    def enterSource(self, ctx:LatinoGrammarParser.SourceContext):
        self.jsCode += '?~sentence'*len(ctx.sentence())


    def enterSentence(self, ctx: LatinoGrammarParser.SentenceContext):
        tabs = self.indentationStack[-1]*'\t'
        lineEnd = ';\n'
        # Skip tabs and ending for some sentences ex: inside for
        if '?~noTab' in self.jsCode:
            self.jsCode = self.jsCode.replace('?~noTab', '')
            tabs = ''
            lineEnd = ''

        if ctx.assig():
            self.jsCode = self.jsCode.replace('?~sentence', f'{tabs}?~assig-sentence{"?~noEnd" if lineEnd == "" else ""}', 1)
            enterAssignationSentence(self, ctx)
        elif ctx.R_UNARY_OP():
            self.jsCode = self.jsCode.replace('?~sentence', f'{tabs}?~assigID{ctx.R_UNARY_OP().getText()}{lineEnd}', 1)
        elif ctx.functionCall():
            self.jsCode = self.jsCode.replace('?~sentence', f'{tabs}?~assigID(?~funCall){lineEnd}', 1)
        elif ctx.functionReturn():
            self.jsCode = self.jsCode.replace('?~sentence', f'{tabs}?~return{lineEnd}', 1)
        elif ctx.builtInFuncSentence():
            self.jsCode = self.jsCode.replace('?~sentence', f'{tabs}?~BI_Func{lineEnd}', 1)
        elif ctx.opBuiltInTipo():
            self.jsCode = self.jsCode.replace('?~sentence', f'{tabs}?~opBT{lineEnd}', 1)
        elif ctx.doWhileBlock():
            self.jsCode = self.jsCode.replace('?~sentence', f'{tabs}?~doWhile{lineEnd}', 1)
        elif ctx.codeBlock():
            self.jsCode = self.jsCode.replace('?~sentence', f'{tabs}?~codeBlock\n', 1)
        else:
            # The only remaining case is break
            self.jsCode = self.jsCode.replace('?~sentence', f'{tabs}break{lineEnd}', 1)


    def enterAssig(self, ctx:LatinoGrammarParser.AssigContext):
        enterAssignationRule(self, ctx)

    def enterExp(self, ctx:LatinoGrammarParser.ExpContext):
        if '?~PrintArgs' in self.jsCode:
            defineArgsPrint(self, ctx)
        string_replacement = f'?~terminal'
        # Add terminal placeholders if there are binary operations
        operator = ''
        # TODO: translation of string operators
        for binary_op in ctx.binaryOp():
            if binary_op.L_UNARY_OP():
                operator = binary_op.L_UNARY_OP().getText()
            elif binary_op.NUMERIC_OP():
                operator = binary_op.NUMERIC_OP().getText()
            elif binary_op.LOGIC_OP():
                operator = binary_op.LOGIC_OP().getText()
            else:
                operator = binary_op.STRING_OP().getText().replace('..', '+')
            string_replacement += f' {operator} ?~terminal'

        if '?~skip' not in self.jsCode:
            self.jsCode = self.jsCode.replace('?~exp', string_replacement, 1)
        

    def enterTerminal(self, ctx:LatinoGrammarParser.TerminalContext):
        string_to_replace = ''
        # TODO: complete the cases, hopefully it won't become spaghetti
        if '?~skip' in self.jsCode:
            self.jsCode = self.jsCode.replace('?~skip', '')
        elif ctx.REAL():
            string_to_replace = ctx.REAL().getText()
        elif ctx.STRING():
            string_to_replace = ctx.STRING().getText()
        elif ctx.ID():
            string_to_replace += ctx.ID().getText()

            for modifier in ctx.assignableIDModifiers():
                string_to_replace += '?~modifier'

            if ctx.functionCall():
                string_to_replace += '(?~funCall)'

        elif ctx.BOOLEAN_VALS():
            string_to_replace = self.boolean_and_null_translation[ctx.BOOLEAN_VALS().getText()]
        elif ctx.NULL_VAL():
            string_to_replace = self.boolean_and_null_translation[ctx.NULL_VAL().getText()]
        elif ctx.OPENING_PAR():
            string_to_replace = f'(?~exp)'
        elif ctx.L_UNARY_OP():
            string_to_replace = f'{ctx.L_UNARY_OP().getText()}?~exp'
        elif ctx.opBuiltInTipo():
            string_to_replace = '?~opBT'
        elif ctx.listDefinition():
            string_to_replace = '?~listDef'
        elif ctx.OP_BUILTIN_FUNCS_NO_ARG():
            string_to_replace = 'JS no toma inputs de la consola, si se necesitan entradas del usuario se deben usar librerías o etiquetas HTML'
        else:
            # Only remaining case is dict definition
            string_to_replace = '?~dictDef'
        self.jsCode = self.jsCode.replace('?~terminal', string_to_replace, 1)

    def enterOpBuiltInTipo(self, ctx:LatinoGrammarParser.OpBuiltInTipoContext):
        enterOpBuiltInTipoRule(self, ctx)

    def enterCodeBlock(self, ctx:LatinoGrammarParser.CodeBlockContext):
        if ctx.functionBlock():
            self.jsCode = self.jsCode.replace('?~codeBlock', '?~functionBlock', 1)
        elif ctx.conditionalBlock():
            self.jsCode = self.jsCode.replace('?~codeBlock', '?~conditionalBlock', 1)
        elif ctx.switchBlock():
            self.jsCode = self.jsCode.replace('?~codeBlock', '?~switchBlock', 1)
        elif ctx.forBlock():
            self.jsCode = self.jsCode.replace('?~codeBlock', '?~forBlock', 1)
        elif ctx.whileBlock():
            self.jsCode = self.jsCode.replace('?~codeBlock', '?~whileBlock', 1)
        else:
            # Remaining case is for range
            self.jsCode = self.jsCode.replace('?~codeBlock', '?~rangedForBlock', 1)

    def enterFunctionBlock(self, ctx:LatinoGrammarParser.FunctionBlockContext):
        enterFunctionBlockRule(self, ctx)

    def exitFunctionBlock(self, ctx:LatinoGrammarParser.FunctionBlockContext):
        exitFunctionBlockRule(self, ctx)

    def enterFunctionReturn(self, ctx:LatinoGrammarParser.FunctionReturnContext):
        enterFunctionReturnRule(self, ctx)

    def enterFunctionCall(self, ctx:LatinoGrammarParser.FunctionCallContext):
        enterFunctionCallRule(self, ctx)
    
    def enterBuiltInFuncSentence(self, ctx:LatinoGrammarParser.BuiltInFuncSentenceContext):
        enterBuiltInFuncSentenceRule(self, ctx)

    def enterListDefinition(self, ctx:LatinoGrammarParser.ListDefinitionContext):
        enterListDefRule(self, ctx)


    def enterDictDefinition(self, ctx:LatinoGrammarParser.DictDefinitionContext):
        enterDictDefRule(self, ctx)


    def exitDictDefinition(self, ctx:LatinoGrammarParser.DictDefinitionContext):
        exitDictDefRule(self, ctx)


    def enterAnonymousFuncDef(self, ctx:LatinoGrammarParser.AnonymousFuncDefContext):
        enterAnonymousFuncDefRule(self, ctx)


    def exitAnonymousFuncDef(self, ctx:LatinoGrammarParser.AnonymousFuncDefContext):
        exitAnonymousFuncDefRule(self, ctx)

        
    def enterAssignableID(self, ctx:LatinoGrammarParser.AssignableIDContext):
        string_replacement = ctx.ID().getText()+'?~modifier'*len(ctx.assignableIDModifiers())

        self.jsCode = self.jsCode.replace('?~assigID', string_replacement, 1)

    def enterAssignableIDModifiers(self, ctx:LatinoGrammarParser.AssignableIDModifiersContext):
        if ctx.listAccess():
            self.jsCode = self.jsCode.replace('?~modifier', '[?~exp]')
        else:
            self.jsCode = self.jsCode.replace('?~modifier', ctx.propertyAccess().getText())


    def enterAssignableExp(self, ctx:LatinoGrammarParser.AssignableExpContext):
        if ctx.anonymousFuncDef():
            self.jsCode = self.jsCode.replace('?~exp', '?~anonFunc', 1)

    def enterConditionalBlock(self, ctx: LatinoGrammarParser.ConditionalBlockContext):
        enterConditional(self, ctx)

    def exitConditionalBlock(self, ctx: LatinoGrammarParser.ConditionalBlockContext):
        exitConditional(self, ctx)

    def enterAltCondition(self, ctx: LatinoGrammarParser.AltConditionContext):
        enterAltConditional(self, ctx)

    def exitAltCondition(self, ctx:LatinoGrammarParser.AltConditionContext):
        exitAltConditional(self, ctx)

    def enterNoCondition(self, ctx: LatinoGrammarParser.NoConditionContext):
        enterNoConditional(self, ctx)

    def exitNoCondition(self, ctx:LatinoGrammarParser.NoConditionContext):
        exitNoConditional(self, ctx)

    def enterSwitchBlock(self, ctx: LatinoGrammarParser.SwitchBlockContext):
        enterSwitch(self, ctx)

    def exitSwitchBlock(self, ctx: LatinoGrammarParser.SwitchBlockContext):
        exitSwitch(self, ctx)

    def enterSwitchCasesDef(self, ctx: LatinoGrammarParser.SwitchCasesDefContext):
        enterSwitchCases(self, ctx)

    def exitSwitchCasesDef(self, ctx: LatinoGrammarParser.SwitchCasesDefContext):
        exitSwitchCases(self,ctx)
        pass

    def enterWhileBlock(self, ctx: LatinoGrammarParser.WhileBlockContext):
        enterWhileBlockRule(self, ctx)

    def exitWhileBlock(self, ctx: LatinoGrammarParser.WhileBlockContext):
        exitWhileBlockRule(self, ctx)

    def enterDoWhileBlock(self, ctx: LatinoGrammarParser.DoWhileBlockContext):
        enterDoWhileBlockRule(self, ctx)

    def exitDoWhileBlock(self, ctx: LatinoGrammarParser.DoWhileBlockContext):
        exitDoWhileBlockRule(self, ctx)

    def enterForBlock(self, ctx:LatinoGrammarParser.ForBlockContext):
        enterForBlockRule(self, ctx)

    def exitForBlock(self, ctx:LatinoGrammarParser.ForBlockContext):
        exitForBlockRule(self, ctx)

    def enterForRangeBlock(self, ctx:LatinoGrammarParser.ForRangeBlockContext):
        enterForRangeBlockRule(self, ctx)

    def exitForRangeBlock(self, ctx:LatinoGrammarParser.ForRangeBlockContext):
        exitForRangeBlockRule(self, ctx)

    def exitSource(self, ctx:LatinoGrammarParser.SourceContext):
        print("----------------------JS CODE----------------------")
        print(self.jsCode)

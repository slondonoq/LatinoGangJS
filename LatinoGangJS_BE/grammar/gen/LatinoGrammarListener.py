# Generated from C:/Users/londo/Documents/Estudio/Materias/Lenguajes de programación/Traductor/grammar/LatinoGrammar.g4 by ANTLR 4.13.1
from antlr4 import *
if "." in __name__:
    from .LatinoGrammarParser import LatinoGrammarParser
else:
    from LatinoGrammarParser import LatinoGrammarParser

# This class defines a complete listener for a parse tree produced by LatinoGrammarParser.
class LatinoGrammarListener(ParseTreeListener):

    # Enter a parse tree produced by LatinoGrammarParser#source.
    def enterSource(self, ctx:LatinoGrammarParser.SourceContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#source.
    def exitSource(self, ctx:LatinoGrammarParser.SourceContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#sentence.
    def enterSentence(self, ctx:LatinoGrammarParser.SentenceContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#sentence.
    def exitSentence(self, ctx:LatinoGrammarParser.SentenceContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#assignableID.
    def enterAssignableID(self, ctx:LatinoGrammarParser.AssignableIDContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#assignableID.
    def exitAssignableID(self, ctx:LatinoGrammarParser.AssignableIDContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#assignableIDModifiers.
    def enterAssignableIDModifiers(self, ctx:LatinoGrammarParser.AssignableIDModifiersContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#assignableIDModifiers.
    def exitAssignableIDModifiers(self, ctx:LatinoGrammarParser.AssignableIDModifiersContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#listAccess.
    def enterListAccess(self, ctx:LatinoGrammarParser.ListAccessContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#listAccess.
    def exitListAccess(self, ctx:LatinoGrammarParser.ListAccessContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#propertyAccess.
    def enterPropertyAccess(self, ctx:LatinoGrammarParser.PropertyAccessContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#propertyAccess.
    def exitPropertyAccess(self, ctx:LatinoGrammarParser.PropertyAccessContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#assig.
    def enterAssig(self, ctx:LatinoGrammarParser.AssigContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#assig.
    def exitAssig(self, ctx:LatinoGrammarParser.AssigContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#exp.
    def enterExp(self, ctx:LatinoGrammarParser.ExpContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#exp.
    def exitExp(self, ctx:LatinoGrammarParser.ExpContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#binaryOp.
    def enterBinaryOp(self, ctx:LatinoGrammarParser.BinaryOpContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#binaryOp.
    def exitBinaryOp(self, ctx:LatinoGrammarParser.BinaryOpContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#terminal.
    def enterTerminal(self, ctx:LatinoGrammarParser.TerminalContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#terminal.
    def exitTerminal(self, ctx:LatinoGrammarParser.TerminalContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#opBuiltInTipo.
    def enterOpBuiltInTipo(self, ctx:LatinoGrammarParser.OpBuiltInTipoContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#opBuiltInTipo.
    def exitOpBuiltInTipo(self, ctx:LatinoGrammarParser.OpBuiltInTipoContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#assignableExp.
    def enterAssignableExp(self, ctx:LatinoGrammarParser.AssignableExpContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#assignableExp.
    def exitAssignableExp(self, ctx:LatinoGrammarParser.AssignableExpContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#functionCall.
    def enterFunctionCall(self, ctx:LatinoGrammarParser.FunctionCallContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#functionCall.
    def exitFunctionCall(self, ctx:LatinoGrammarParser.FunctionCallContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#anonymousFuncDef.
    def enterAnonymousFuncDef(self, ctx:LatinoGrammarParser.AnonymousFuncDefContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#anonymousFuncDef.
    def exitAnonymousFuncDef(self, ctx:LatinoGrammarParser.AnonymousFuncDefContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#listDefinition.
    def enterListDefinition(self, ctx:LatinoGrammarParser.ListDefinitionContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#listDefinition.
    def exitListDefinition(self, ctx:LatinoGrammarParser.ListDefinitionContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#dictDefinition.
    def enterDictDefinition(self, ctx:LatinoGrammarParser.DictDefinitionContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#dictDefinition.
    def exitDictDefinition(self, ctx:LatinoGrammarParser.DictDefinitionContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#optionalAssignableExpConcat.
    def enterOptionalAssignableExpConcat(self, ctx:LatinoGrammarParser.OptionalAssignableExpConcatContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#optionalAssignableExpConcat.
    def exitOptionalAssignableExpConcat(self, ctx:LatinoGrammarParser.OptionalAssignableExpConcatContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#optAssigExpConcatWithTrail.
    def enterOptAssigExpConcatWithTrail(self, ctx:LatinoGrammarParser.OptAssigExpConcatWithTrailContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#optAssigExpConcatWithTrail.
    def exitOptAssigExpConcatWithTrail(self, ctx:LatinoGrammarParser.OptAssigExpConcatWithTrailContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#functionReturn.
    def enterFunctionReturn(self, ctx:LatinoGrammarParser.FunctionReturnContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#functionReturn.
    def exitFunctionReturn(self, ctx:LatinoGrammarParser.FunctionReturnContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#builtInFuncSentence.
    def enterBuiltInFuncSentence(self, ctx:LatinoGrammarParser.BuiltInFuncSentenceContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#builtInFuncSentence.
    def exitBuiltInFuncSentence(self, ctx:LatinoGrammarParser.BuiltInFuncSentenceContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#codeBlock.
    def enterCodeBlock(self, ctx:LatinoGrammarParser.CodeBlockContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#codeBlock.
    def exitCodeBlock(self, ctx:LatinoGrammarParser.CodeBlockContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#functionBlock.
    def enterFunctionBlock(self, ctx:LatinoGrammarParser.FunctionBlockContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#functionBlock.
    def exitFunctionBlock(self, ctx:LatinoGrammarParser.FunctionBlockContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#whileBlock.
    def enterWhileBlock(self, ctx:LatinoGrammarParser.WhileBlockContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#whileBlock.
    def exitWhileBlock(self, ctx:LatinoGrammarParser.WhileBlockContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#forBlock.
    def enterForBlock(self, ctx:LatinoGrammarParser.ForBlockContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#forBlock.
    def exitForBlock(self, ctx:LatinoGrammarParser.ForBlockContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#forRangeBlock.
    def enterForRangeBlock(self, ctx:LatinoGrammarParser.ForRangeBlockContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#forRangeBlock.
    def exitForRangeBlock(self, ctx:LatinoGrammarParser.ForRangeBlockContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#doWhileBlock.
    def enterDoWhileBlock(self, ctx:LatinoGrammarParser.DoWhileBlockContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#doWhileBlock.
    def exitDoWhileBlock(self, ctx:LatinoGrammarParser.DoWhileBlockContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#conditionalBlock.
    def enterConditionalBlock(self, ctx:LatinoGrammarParser.ConditionalBlockContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#conditionalBlock.
    def exitConditionalBlock(self, ctx:LatinoGrammarParser.ConditionalBlockContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#altCondition.
    def enterAltCondition(self, ctx:LatinoGrammarParser.AltConditionContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#altCondition.
    def exitAltCondition(self, ctx:LatinoGrammarParser.AltConditionContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#noCondition.
    def enterNoCondition(self, ctx:LatinoGrammarParser.NoConditionContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#noCondition.
    def exitNoCondition(self, ctx:LatinoGrammarParser.NoConditionContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#switchBlock.
    def enterSwitchBlock(self, ctx:LatinoGrammarParser.SwitchBlockContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#switchBlock.
    def exitSwitchBlock(self, ctx:LatinoGrammarParser.SwitchBlockContext):
        pass


    # Enter a parse tree produced by LatinoGrammarParser#switchCasesDef.
    def enterSwitchCasesDef(self, ctx:LatinoGrammarParser.SwitchCasesDefContext):
        pass

    # Exit a parse tree produced by LatinoGrammarParser#switchCasesDef.
    def exitSwitchCasesDef(self, ctx:LatinoGrammarParser.SwitchCasesDefContext):
        pass



del LatinoGrammarParser
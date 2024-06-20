grammar LatinoGrammar;

//REGLAS SINTACTICAS
source                      : sentence* EOF;
sentence                    :
                             assignableID (functionCall | assig | R_UNARY_OP ) |
                             builtInFuncSentence |
                             functionReturn |
                             doWhileBlock |
                             codeBlock |
                             opBuiltInTipo|
                             BREAK;
assignableID                : ID assignableIDModifiers*;
assignableIDModifiers       : listAccess | propertyAccess;
listAccess                  : OPENING_BRA exp CLOSING_BRA;
propertyAccess              : PERIOD ID;
assig                       :
                             (COMMA assignableID)* ASSIGN assignableExp (COMMA assignableExp)* |
                             ASSIGN_OP assignableExp;
exp                         : terminal binaryOp*;
binaryOp                    : (L_UNARY_OP | NUMERIC_OP | LOGIC_OP | STRING_OP) terminal;
terminal                    :
                             OPENING_PAR exp CLOSING_PAR |
                             REAL |
                             STRING |
                             BOOLEAN_VALS |
                             NULL_VAL |
                             ID assignableIDModifiers* functionCall* |
                             L_UNARY_OP exp |
                             opBuiltInTipo |
                             OP_BUILTIN_FUNCS_NO_ARG OPENING_PAR CLOSING_PAR |
                             listDefinition |
                             dictDefinition;
opBuiltInTipo               : OP_BUILTIN_FUNCS_ARG OPENING_PAR assignableExp CLOSING_PAR;
assignableExp               : anonymousFuncDef | exp;
functionCall                : OPENING_PAR optionalAssignableExpConcat CLOSING_PAR;
anonymousFuncDef            : FUNC_KEYWORD OPENING_PAR (ID (COMMA ID)*)? CLOSING_PAR sentence+ BLOCK_END;
listDefinition              : OPENING_BRA optAssigExpConcatWithTrail CLOSING_BRA;
dictDefinition              : OPENING_KEY (exp COLON assignableExp (COMMA exp COLON assignableExp)*)? CLOSING_KEY;
optionalAssignableExpConcat : (assignableExp (COMMA assignableExp)*)?;
optAssigExpConcatWithTrail  : (assignableExp (COMMA assignableExp)* COMMA?)?;
functionReturn              : RETURN_KEYWORD assignableExp (COMMA assignableExp)*;
builtInFuncSentence         :
                             BUILTIN_FUNC_MULTI_ARG OPENING_PAR assignableExp* (COMMA assignableExp)* CLOSING_PAR |
                             BUILTIN_FUNC_SINGLE_ARG OPENING_PAR assignableExp* CLOSING_PAR |
                             BUILTIN_FUNC_NO_ARG OPENING_PAR CLOSING_PAR ;
codeBlock                   : (
                             functionBlock |
                             whileBlock |
                             forBlock |
                             forRangeBlock |
                             conditionalBlock |
                             switchBlock
                            ) BLOCK_END;
functionBlock               : FUNC_KEYWORD ID OPENING_PAR (ID (COMMA ID)*)? CLOSING_PAR sentence+;
whileBlock                  : WHILE exp (sentence)+;
forBlock                    : FOR OPENING_PAR assignableID (ASSIGN_OP | ASSIGN) exp SEMICOLON exp SEMICOLON sentence CLOSING_PAR sentence+;
forRangeBlock               : FOR_RANGE ID IN RANGE OPENING_PAR exp (COMMA exp)? (COMMA exp)? CLOSING_PAR (sentence)+;
doWhileBlock                : DO_WHILE_START (sentence)+ DO_WHILE_END exp;
conditionalBlock            : IF  exp sentence+ altCondition* noCondition?;
altCondition                : ELSE_IF exp sentence+;
noCondition                 : ELSE sentence+;
switchBlock                 : SWITCH exp switchCasesDef;
switchCasesDef              :
                             ((CASE exp COLON)+ (sentence)+ switchCasesDef*) |
                             DEF_CASE COLON sentence+;

//TOKENS
L_UNARY_OP              : '+' | '-' | '!';
NUMERIC_OP              : '*' | '/' | '%' | '^';
LOGIC_OP                : '&&' | '||' | '==' | '!=' | '<=' | '>=' | '>' | '<';
STRING_OP               : '..' | '~=';
ASSIGN                  : '=';
ASSIGN_OP               : '%=' | '/=' |'*=' | '-=' | '+=';
BOOLEAN_VALS            : 'verdadero' | 'cierto' | 'falso';
NULL_VAL                : 'nulo';
OP_BUILTIN_FUNCS_ARG    : 'anumero' | 'acadena' | 'alogico' | 'tipo';
OP_BUILTIN_FUNCS_NO_ARG : 'leer';
R_UNARY_OP              : '++' | '--';
FUNC_KEYWORD            : 'funcion' | 'fun';
RETURN_KEYWORD          : 'retorno' | 'retornar' | 'ret';
BUILTIN_FUNC_NO_ARG     : 'limpiar';
BUILTIN_FUNC_SINGLE_ARG : 'escribir' | 'imprimir' | 'poner';
BUILTIN_FUNC_MULTI_ARG  : 'imprimirf';
BREAK                   : 'romper';
CASE                    : 'caso';
DEF_CASE                : 'otro' | 'defecto';
SWITCH                  : 'elegir';
IF                      : 'si';
ELSE_IF                 : 'osi';
ELSE                    : 'sino';
BLOCK_END               : 'fin';
WHILE                   : 'mientras';
FOR                     : 'desde';
FOR_RANGE               : 'para';
IN                      : 'en';
RANGE                   : 'rango';
DO_WHILE_START          : 'repetir';
DO_WHILE_END            : 'hasta';
OPENING_BRA             : '[';
CLOSING_BRA             : ']';
OPENING_PAR             : '(';
CLOSING_PAR             : ')';
OPENING_KEY             : '{';
CLOSING_KEY             : '}';
PERIOD                  : '.';
COMMA                   : ',';
COLON                   : ':';
SEMICOLON               : ';';

//REGLAS LEXICAS
ID                    : [a-zA-Z_]+ [a-zA-Z0-9_]*;
REAL                  : [0-9]+('.'[0-9]+)?;
STRING                :  SINGLE_QUOTE | DOUBLE_QUOTE;
fragment SINGLE_QUOTE : '\'' (~('\'' | [\n\r]) | '\\\'')* '\'';
fragment DOUBLE_QUOTE : '"' (~('"' | [\n\r]) | '\\"')* '"';
SPACE                 : [ \t\r\n]+ -> skip;
LINE_COMMENT          : ('//' | '#') ~[\r\n]* -> skip;
MULTILINE_COMMENT     : '/*' .*? '*/' -> skip;

set server=.
set database=KursyTutoriale

sqlcmd -S %server% -d %database% -E -i DefaultValues.sql
sqlcmd -S %server% -d %database% -E -i DefaultUsers.sql

pause
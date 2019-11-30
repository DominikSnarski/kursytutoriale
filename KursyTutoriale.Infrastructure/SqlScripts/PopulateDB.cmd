
set server=.
set database=KursyTutoriale

sqlcmd -S %server% -d %database% -E -i DefaultValues.sql

pause
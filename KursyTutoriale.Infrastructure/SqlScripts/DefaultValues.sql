PRINT N'Tags_JL_0_0 begins';
BEGIN TRAN Tags_JL_0_0;
	IF NOT EXISTS (SELECT * FROM KTTag WHERE Name='Cooking') INSERT INTO KTTag(Id,Name) VALUES (NEWID(),'Cooking');
	IF NOT EXISTS (SELECT * FROM KTTag WHERE Name='Business') INSERT INTO KTTag(Id,Name) VALUES (NEWID(),'Business');
	IF NOT EXISTS (SELECT * FROM KTTag WHERE Name='Design') INSERT INTO KTTag(Id,Name) VALUES (NEWID(),'Design');
	IF NOT EXISTS (SELECT * FROM KTTag WHERE Name='Illustration') INSERT INTO KTTag(Id,Name) VALUES (NEWID(),'Illustration');
	IF NOT EXISTS (SELECT * FROM KTTag WHERE Name='Entrepreneurship') INSERT INTO KTTag(Id,Name) VALUES (NEWID(),'Entrepreneurship');
	IF NOT EXISTS (SELECT * FROM KTTag WHERE Name='Writing') INSERT INTO KTTag(Id,Name) VALUES (NEWID(),'Writing');
	IF NOT EXISTS (SELECT * FROM KTTag WHERE Name='Technology') INSERT INTO KTTag(Id,Name) VALUES (NEWID(),'Technology');
COMMIT TRAN Tags_JL_0_0;
PRINT N'Tags_JL_0_0 completed';

PRINT N'Tags_JL_0_1 begins';
BEGIN TRAN Genders_JL_0_0;
	IF NOT EXISTS (SELECT * FROM KTGender WHERE Name='Man') INSERT INTO KTGender(Id,Name) VALUES (NEWID(),'Man');
	IF NOT EXISTS (SELECT * FROM KTGender WHERE Name='Woman') INSERT INTO KTGender(Id,Name) VALUES (NEWID(),'Woman');
	IF NOT EXISTS (SELECT * FROM KTGender WHERE Name='Other') INSERT INTO KTGender(Id,Name) VALUES (NEWID(),'Other');
COMMIT TRAN Genders_JL_0_0;
PRINT N'Tags_JL_0_1 completed';
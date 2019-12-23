PRINT 'UserRole_JL begins';
BEGIN TRAN UserRole_JL;

	DECLARE @user_role_id UNIQUEIDENTIFIER;
	IF NOT EXISTS(SELECT TOP 1 r.Id FROM AspNetRoles r WHERE r.Name = 'User') GOTO ERROR;

	SET @user_role_id = (SELECT TOP 1 r.Id FROM AspNetRoles r WHERE r.Name = 'User');

	INSERT INTO AspNetUserRoles(
		UserId,
		RoleId
	)
	SELECT
		u.Id,
		@user_role_id
	FROM AspNetUsers u 
	LEFT JOIN AspNetUserRoles ur ON ur.UserId = u.Id
	LEFT JOIN AspNetRoles r ON r.Id = ur.RoleId
	WHERE r.Name IS NULL;
	GOTO SUCCESS;

ERROR: 
	ROLLBACK TRAN UserRole_JL;
	PRINT N'Error occured during UserRole_JL execution';
	GOTO TEND;

SUCCESS:
	COMMIT TRAN UserRole_JL;
	PRINT N'UserRole_JL completed';
TEND:
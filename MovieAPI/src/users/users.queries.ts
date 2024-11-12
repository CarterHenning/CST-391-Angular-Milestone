export const userQueries = {
    readUsers: `
        SELECT
            *
        FROM cst_391_milestone.user
        `,
    readUsersByUserId: `
        SELECT
            UserId as UserId, UserName AS UserName, Password AS Password,
            Email AS Email, FirstName AS FirstName, LastName AS LastName, IsAdmin
        FROM cst_391_milestone.user
        WHERE cst_391_milestone.user.UserId = ?
    `,
    createUser: `
        INSERT INTO user(UserName, Password, Email, FirstName, LastName, IsAdmin) VALUES(?,?,?,?,?,?)
    `,
    updateUser: `
        UPDATE cst_391_milestone.user
        SET UserName = ?, Password = ?, Email = ?, FirstName = ?, LastName = ?, IsAdmin = ?
        WHERE UserId = ?
    `,
    deleteUser: `
        DELETE FROM cst_391_milestone.user
        WHERE UserId = ?
    `,

    readUsersByUserName: 'SELECT * FROM cst_391_milestone.user WHERE UserName = ?',
}
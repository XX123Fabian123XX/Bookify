const getUserInformation = (user) => {
    return {
        id:user.getId(),
        name:user.getName(),
        password:user.getPassword ? user.getPassword() : null,
        email:user.getEmail()
    }
}

module.exports = getUserInformation;
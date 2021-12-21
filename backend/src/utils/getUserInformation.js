
const getUserInformation = (user) => {
    const userInformation = {
        id:user.getId(),
        name:user.getName(),
        email:user.getEmail(),
    }

    if (user.getPassword) userInformation.password = user.getPassword();
    if (user.getPasswordLastChanged) userInformation.passwordLastChanged = user.getPasswordLastChanged()

    return userInformation;
}

module.exports = getUserInformation;
import User from '../schemas/User.js';
import UserAddress from '../schemas/UserAddress.js';

const getUserProfile = async (req, res) => {
    const userEmail = req.user.email;

    try {
        const { userid, name, email, phoneNumber, UserAddresses,tag } = await User.findOne({
            where: { email:userEmail },
            include: [
                {
                    model: UserAddress,
                    as: 'UserAddresses', // optional alias, match association if defined
                },
            ],
        });
        const user = { userid, name, email, phoneNumber, UserAddresses,tag }
        if (!user) return res.status(404).json({ message: 'User not available' });

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: error.message });
    }
};

export {
    getUserProfile
};

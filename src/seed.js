import './db-config';
import bcrypt from 'bcrypt';
import User from './model/user';
import Tenant from './model/tenant';

const tenantData = {
    name: 'Tenant',
};

const userData = {
    name: 'admin',
    password: '123456',
};

(async () => {
    try {
        const tenant = await Tenant.findOne(tenantData);
        if (tenant) return console.log('Initial Seed Already Exist');
        const { _id } = await Tenant.create(tenantData);
        userData.tenantId = _id;
        userData.password = await passwordHash(userData.password);
        await User.create(userData);
        console.log('Seeding Completed');
        return true;
    } catch (e) {
        console.log('Seeding failed', e);
        return false;
    }
})();

const passwordHash = async password => bcrypt.hash(password, await bcrypt.genSalt(10));

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getUsers } from '../api/apiCall';
import Spinner from './Spinner';
import { useApiProgress } from '../shared/ApiProgress';
import UserListItem from './UserListItem';

const UserList = () => {

    const [page, setPage] = useState({ content: [] });

    const [loadFailure, setLoadFailure] = useState(false);

    const pendingApiCall = useApiProgress('get', '/api/1.0/users?page');

    useEffect(() => {
        loadUsers();
    }, [])
    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);

    }
    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);
    }
    const loadUsers = async (page) => {
        setLoadFailure(false);
        try {
            const response = await getUsers(page);
            setPage(response.data);
        } catch (err) {
            setLoadFailure(true);
        }
    }

    const { content: users, last, first } = page;
    const { t } = useTranslation();
    let action = (
        <div className='clearfix'>
            {first === false && <button className='btn btn-sm btn-dark mt-2' onClick={onClickPrevious}>{t('Previous')}</button>}  {last === false && <button className='btn btn-sm btn-dark float-end mt-2' onClick={onClickNext}>{t('Next')}</button>}
        </div>
    )
    if (pendingApiCall) {
        action = (
            <Spinner />
        )
    }
    return (
        <div>
            <div className='card'>
                <h3 className='card-header text-center'>{t('Users')}</h3>
                <div className='list-group-flush'>
                    {users.map((user) => {
                        return (
                            <UserListItem key={user.username} user={user} />
                        )
                    })}
                </div>
            </div>
            {action}
            {loadFailure && <div className='text-center text-danger'> {t('Load Failure')}</div>}
        </div>
    );
}

export default UserList;
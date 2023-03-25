import React from "react";
import PropTypes from "prop-types";

import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete,
    qualities,
    ...rest
}) => {
    /* на самом деле я не очень понял задание.
    Как его понял я: мы "фетчим" с сервера все качества. Потом для каждого пользователя фильтруем качества. По новой структуре кода у пользователей качества содержат лишь айдишники, значит нам надо их сравнить с айдишниками качеств и вернуть сходные. Ниже функция, которую я разработал для фильтрации качеств. Глобальный провайдер качеств обёрнут вокруг switch, но я не уверен что это верно. Прошу указать на мои ошибки.
С этим кодом всё работает: я изменяю в прямом эфире качества в приложении qualities и они меняются на основном
    */
    const getUserQuality = (qualities, user) => {
        // eslint-disable-next-line
        const newArrayOfQualities = qualities.filter(function (qual) {
            for (const userQuality of user.qualities) {
                if (userQuality === qual._id) return qual;
            }
        });
        return newArrayOfQualities;
    };
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => (
                <Qualities qualities={getUserQuality(qualities, user)} />
            )
        },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    qualities: PropTypes.array
};

export default UserTable;

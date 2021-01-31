import React from 'react';
import BookListTableRow from './BookListTableRow';
import { useTranslation } from 'react-i18next';

function BookListTable(props) {
    const books = props.booksList;
    const { t } = useTranslation();
    return (
        <table className="table-list" >
            <thead>
            <tr>
                <th>{t('ks.list.fields.Tytul')}</th>
                <th>{t('ks.list.fields.Autor')}</th>
                <th>{t('ks.list.fields.DataWydania')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {books.map(ks =>
                <BookListTableRow bookData={ks} key={ks.Id_Ksiazka} />
            )}
            </tbody>
        </table >
    )
};

export default BookListTable;
'use strict';

/***************************************************************************************/
/***************************** DONNEES CARNET D'ADRESSES *******************************/
/***************************************************************************************/

const DOM_STORAGE_ITEM_NAME = 'Address Book';



/***************************************************************************************/
/***************************** FONCTIONS CARNET D'ADRESSES *****************************/
/***************************************************************************************/

function createContact(title, firstName, lastName, phone)
{
    const contact           = new Object();
    contact.firstName = firstName;
    contact.lastName  = lastName.toUpperCase();
    contact.phone     = phone;

    switch(title) {

        case '1':
        contact.title = 'Mme.';
        break;

        case '2':
        contact.title = 'Mlle.';
        break;

        case '3':
        contact.title = 'M.';
        break;
    }

    return contact;
}

function loadAddressBook()
{
    // Chargement du carnet d'adresses depuis le DOM storage.
    let addressBook = loadDataFromDomStorage(DOM_STORAGE_ITEM_NAME);

    // Est-ce qu'il n'y avait aucune donnée dans le DOM storage ?
    if(addressBook == null) {

        // Oui, création d'un carnet d'adresses vide.
        addressBook = new Array();
    }

    return addressBook;
}

function refreshAddressBook()
{
    const addressBook = loadAddressBook();

    // Suppression de l'ensemble du carnet d'adresses HTML.
    $('#address-book').empty();

    // Construction de la liste <ul> contenant le carnet d'adresses HTML.
    const addressBookList = $('<ul>');

    // Affichage HTML du carnet d'adresses, un contact à la fois.
    for(let index = 0; index < addressBook.length; index++)
    {
        // Construction de l'hyperlien <a> contenant le nom et prénom du contact.
        const hyperlink = $('<a>').attr('href', '#').data('index', index).text
        (
            addressBook[index].firstName + ' ' + addressBook[index].lastName
        );

        /*
         * 1. Insertion de la balise <a> dans une nouvelle balise <li>
         * 2. Ajout de la balise <li> à l'intérieur de la balise <ul>
         */
        addressBookList.append($('<li>').append(hyperlink));
    }

    $('#address-book').append(addressBookList);
}

function saveAddressBook(addressBook)
{
    // Enregistrement du carnet d'adresses dans le DOM storage.
    saveDataToDomStorage(DOM_STORAGE_ITEM_NAME, addressBook);
}
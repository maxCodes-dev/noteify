/**
 * @file Typedefs.
 * @author MaxCodes
 */

/**
 * An object containing note data.
 * @typedef {Object} NoteData
 * @property {string} title - The name/title of the note.
 * @property {string} body - The body text of the note.
 * @property {string} timestamp - The timestamp of the note's creation. Used
 * for identifying the note and for the `key` prop of the `NotePreview` component the data is passed to.
 */

/**
 * An object representing a user's data.
 * @typedef {Object} UserData
 * @property {NoteData[]} noteData - The user's note data.
 * @property {string} password - The user's password.
 */

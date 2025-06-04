const pickerOpts = {
  types: [
    {
      description: "json",
      accept: {
        "application/*": [".json"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
  suggestedName: "notes.json",
};

/**
 * Loads note data from a file.
 * @param {boolean} doCreate - Whether to select a file or create a file.
 * @returns {Promise<FileSystemFileHandle>}
 */
export async function loadNoteFile(doCreate) {
  /**@type {FileSystemFileHandle} */
  let notesFileHandle;
  if (doCreate) {
    notesFileHandle = await window.showSaveFilePicker(pickerOpts);
  } else {
    [notesFileHandle] = await window.showOpenFilePicker(pickerOpts);
  }
  notesFileHandle.requestPermission({ mode: "readwrite" });
  if (doCreate) {
    await saveNoteFile(notesFileHandle, []);
  }
  return notesFileHandle;
}

/**
 * Writes data to a file.
 * @param {FileSystemFileHandle} notesFileHandle - The file handle to write to.
 * @param {Object} noteData - The data to write to the handle.
 */
export async function saveNoteFile(
  notesFileHandle,
  noteData,
  handleStateUpdate = null,
) {
  /**@type {FileSystemWritableFileStream} */
  const notesWriteable = await notesFileHandle.createWritable();
  await notesWriteable.write(JSON.stringify(noteData));
  await notesWriteable.close();
  if (handleStateUpdate) handleStateUpdate();
}

/**
 * @param {string} username - username of the user whose data is to be fetched.
 * @returns {Promise<UserData[]>}
 */
export async function fetchUserData(username) {
  const users = await fetch(`/data/users`);
  const usersData = await users.json();
  const userData = usersData[username];
  return userData;
}

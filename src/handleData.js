/**
 * Loads note data from a file.
 * @param {Boolean} doCreate - Whether to select a file or create a file.
 * @returns {Promise<FileSystemFileHandle>}
 */
export async function loadNoteData(doCreate) {
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
  /**@type {FileSystemFileHandle} */
  let notesFileHandle;
  if (doCreate) {
    notesFileHandle = await window.showSaveFilePicker(pickerOpts);
  } else {
    [notesFileHandle] = await window.showOpenFilePicker(pickerOpts);
  }
  notesFileHandle.requestPermission({"mode": "readwrite"});
  if (doCreate) {
    await saveNoteData(notesFileHandle, []);
  }
  return notesFileHandle;
}

/**
 * Writes data to a file.
 * @param {FileSystemFileHandle} notesFileHandle - The file handle to write to.
 * @param {Object} noteData - The data to write to the handle.
 */
export async function saveNoteData(notesFileHandle, noteData) {
  /**@type {FileSystemWritableFileStream} */
  const notesWriteable = await notesFileHandle.createWritable();
  await notesWriteable.write(JSON.stringify(noteData));
  await notesWriteable.close();
}
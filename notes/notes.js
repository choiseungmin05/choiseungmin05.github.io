function addNote() {
  const noteText = document.getElementById('noteInput').value;
  if (noteText === "") return;
  
  const note = document.createElement('div');
  note.className = 'note';
  
  const noteContent = document.createElement('span');
  noteContent.textContent = noteText;
  note.appendChild(noteContent);
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function() {
      note.remove();
  };
  note.appendChild(deleteButton);
  
  document.getElementById('notes').appendChild(note);
  
  document.getElementById('noteInput').value = "";
}

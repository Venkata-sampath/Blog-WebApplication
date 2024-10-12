$(document).ready(function(){
    
    //for setting date automatically the date post was created 
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('date').value = formattedDate;

    //initializing quill editor and toolbar options
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      
        ['clean']                                         // remove formatting button
    ];
    var quill = new Quill('#editor-container', {
        modules: {
            toolbar: toolbarOptions
          },
        theme: 'snow'
    });
    
    // Handle form submission to send Quill's content
    const form = document.querySelector('form');
    form.onsubmit = function() {
    // Populate the hidden input with the editor's HTML content
    const contentInput = document.querySelector('input[name=content]');
    contentInput.value = quill.root.innerHTML;
    };

    // Function to resize the Quill editor
    function resizeEditor() {
        const editorContainer = document.getElementById('editor-container');
        const newHeight = quill.root.scrollHeight; // Get height based on content
        editorContainer.style.height = `${newHeight}px`; // Set the new height
    }

    // Attach the resize function to the text change event
    quill.on('text-change', function() {
        resizeEditor();
    });

    
    // Initial call to set the height
    resizeEditor();

});



function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

function generate() {
    loadFile(
        "https://docxtemplater.com/tag-example.docx",
        function (error, content) {
            if (error) {
                throw error;
            }
            var zip = new PizZip(content);
            var doc = new window.docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            // render the document
            // (replace all occurences of {first_name} by John, {last_name} by Doe)
            doc.render({
                first_name: "John",
                last_name: "Doe",
                phone: "0652455478",
                description: "New Website",
            });

            var out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });
            // Output the document using Data-URI
            saveAs(out, "output.docx");
        }
    );
}
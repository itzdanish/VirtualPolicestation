downPdf.onclick = function () {
    html2canvas(document.body, {
        onrendered: function (canvas) {
            //Returns the image data URL, parameter: image format and clarity (0-1)
            var pageData = canvas.toDataURL("image/jpeg", 1.0)

            //Default vertical direction, size ponits, format a4[595.28,841.89]
            var pdf = new jsPDF("", "pt", "a4")

            //Two parameters after addImage control the size of the added image, where the page height is compressed according to the width-height ratio column of a4 paper.
            pdf.addImage(
                pageData,
                "JPEG",
                0,
                0,
                595.28,
                (592.28 / canvas.width) * canvas.height
            )

            pdf.save("stone.pdf")
        },
    })
}
 // var printDoc = new jsPDF()
 // printDoc.fromHTML($("#paper").get(0), 10, 10, { width: 300 })
 // var blob = printDoc.save()
 // var formData = new FormData()
 // formData.append("pdf", blob)
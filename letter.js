const photoInput = document.getElementById('photo');
        const photoPreview = document.getElementById('photoPreview');

        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    photoPreview.src = e.target.result;
                    photoPreview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });

        document.getElementById('coverLetterForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
            const domainName = document.getElementById('domainName').value;
            const domainExtension = document.getElementById('domainExtension').value;
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const photo = photoPreview.src;
            const includeSignature = document.getElementById('includeSignature').checked;

            const fullDomainName = domainName + domainExtension;

            let letter = `
                                                                                  Date: ${date}

To,
The Host Master
Mercantile Communication Pvt. Ltd.

                         Subject: For ${domainExtension} Domain Registration
Dear Sir/Madam,

I would like to register ${fullDomainName} domain name. I have already submitted the domain registration online form. I have attached the scan copy of my passport with this application.

I will be happy if you register my ${fullDomainName} domain name as soon as possible. Thank you for considering my application.

My preferred domain Name: ${fullDomainName}

Your Sincerely,
Name: ${name}
Address: ${address}
Email: ${email}
Phone: ${phone}

                                        <div style="text-align: center; margin-top: -60px;">
                                             <img src="${photo}" alt="Applicant Photo" style="max-width: 200px; max-height: 200px;">
                                         </div>`;
                    if (includeSignature) {                letter += `<div class="signature-line">
                                                                                  Signiture</div>`;
            }

            document.getElementById('generatedLetter').innerHTML = letter;
        });

        function showLoadingIndicator() {
            document.getElementById('loadingIndicator').style.display = 'block';
        }

        function hideLoadingIndicator() {
            document.getElementById('loadingIndicator').style.display = 'none';
        }

        function downloadAsJPG() {
            showLoadingIndicator();
            const element = document.getElementById('generatedLetter');
            const originalStyle = element.style.cssText;
            
            // Temporarily modify the style for capture
            element.style.cssText = `
                position: absolute;
                left: 0;
                top: 0;
                width: 500px;
                height: auto;
                background-color: white;
                padding: 20px;
                overflow: visible;
            `;

            html2canvas(element, {
                scrollY: -window.scrollY,
                scale: 2,
                useCORS: true,
                allowTaint: true,
                height: element.scrollHeight,
                onclone: function(clonedDoc) {
                    let clonedElement = clonedDoc.getElementById('generatedLetter');
                    clonedElement.style.height = 'auto';
                    clonedElement.style.overflow = 'visible';
                    clonedElement.style.maxHeight = 'none';
                }
            }).then(function(canvas) {
                canvas.toBlob(function(blob) {
                    saveAs(blob, "cover_letter.jpg");
                    // Restore original style
                    element.style.cssText = originalStyle;
                    hideLoadingIndicator();
                });
            });
        }

        function downloadAsDocx() {
            showLoadingIndicator();
            const content = document.getElementById('generatedLetter').innerText;
            const doc = new docx.Document({
                sections: [{
                    properties: {},
                    children: [
                        new docx.Paragraph({
                            children: [new docx.TextRun(content)],
                        }),
                    ],
                }],
            });

            docx.Packer.toBlob(doc).then(blob => {
                saveAs(blob, "cover_letter.docx");
                hideLoadingIndicator();
            });
        }
        document.querySelectorAll('input, select').forEach(element => {
            element.addEventListener('focus', () => {
                element.style.boxShadow = `0 0 10px ${getRandomColor(0.5)}`;
            });
            element.addEventListener('blur', () => {
                element.style.boxShadow = '';
            });
        });

        function getRandomColor(alpha = 1) {
            return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${alpha})`;
        }
        // ========================================meeta code with js=======================================================
        // JSON फाइल लोड गर्ने
fetch('letter.json') // नयाँ नाम प्रयोग
.then(response => response.json())
.then(data => {
    // JSON Structured Data DOM मा इनलाइन जोड्ने
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(data);
    document.head.appendChild(scriptTag);
})
.catch(error => console.error('Error loading JSON:', error));

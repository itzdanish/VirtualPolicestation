let selectedFir = "";

$(window).ready(async function () {
    hider();
    const user = await getUser();
    if (user) {
        const { data: firs } = await get(`/station-house-officer/${user.aadhaar_number}/first-information-reports`);

        console.log(firs);
        fillFirs(firs);
        loader($(".input_des"), $(".profile_des"));
    }
});

async function initialLoading() {
    const language = await getValue("language");
    if (!language) {
        swal({
            text: "Please allow sound permission.",
            buttons: true,
        })
            .then((allow) => {
                if (allow) {
                    speak("Please select your language.", "Kripya apni bhaasha choone.");
                    loader($(".input_des"), $(".lang_des"));
                } else {
                    speak("Please enter aadhaar and password.");
                }
            });
    }
}

function fillFirs(firs) {
    firs.forEach(fir => {
        $("#my-complaint").append(
            `<tr>
            <td>${fir.fir_number}</td>
            <td>
                <label style="font-size: 15px" type="submit">${fir.status_name}</label>
            </td>
            <td>
                <a href="fir/view-fir.html?fir_number=${fir.fir_number}" class="btn btn-danger btn-block" type="submit">View</a>
            </td>
            ${!fir.is_signed ? `<td>
                <a href="fir/index.html?fir_number=${fir.fir_number}" class="btn btn-danger btn-block" type="submit">View</a>
            </td>` : `<td>
                <label>Signed</label>
            </td>`}
            
            <td>
                <i class="fa fa-pencil" value=${fir.fir_number} onclick="firEdit(this)" style="color: red; font-size: 25px; margin-top: 8px"></i>
            </td>
        </tr>`
        );
    });
}

function firEdit(selectedItem) {
    speak("Please enter following details", "Kripya nimnlikhit jankaari daale.");
    selectedFir = selectedItem.attributes[1].nodeValue;
    loader($(".profile_des"), $(".fir_edit_des"));
}



function hider() {
    $('.lang_des').hide();
    $('.profile_des').hide();
    $('.fir_edit_des').hide();
}

async function selectLanguage(self) {
    const language = self.firstElementChild.innerText.toLowerCase();
    selectedLanguage = language;
    self.style.backgroundColor = '#7d520e';
    self.firstElementChild.style.color = 'white';
    if (self.nextElementSibling == null) {
        self.previousElementSibling.style.backgroundColor = 'white';
        self.previousElementSibling.firstElementChild.style.color = 'black';
    }
    else {
        self.nextElementSibling.style.backgroundColor = 'white';
        self.nextElementSibling.firstElementChild.style.color = 'black';
    }

}



let selectedLanguage = "";
$(window).ready(async function () {
    hider();
    const user = await getUser();
    if (user) {
        const { data: firs } = await get(`/user/${user.id}/first-information-reports`);
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
                    speak("Please enter aadhaar or phone number.");
                }
            });
    }
}


function determineUserId(number) {
    return number.length == 10 ? { phone_number: number } : number.length == 12 ? { aadhaar_number: number } : false;
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
        </tr>`
        );
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPoliceStaion);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
async function getPoliceStaion(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    const result = await get(`police-stations/?latitude=${lat}&longitude=${lng}`);
    const { data: policeStations } = result;
    storeValue("policeStations", policeStations);
    const options = policeStations.map(ps => `<option id="${ps.police_station_number}"  value="${ps.police_station_number}"> ${ps.police_station_address} </option>`);
    options.forEach(option => {
        $("#myPoliceStation").append(option);
    });

}

function hider() {
    $('.lang_des').hide();
    $('.otp_des').hide();
    $('.detail_des1').hide();
    $('.detail_des2').hide();
    $('.loc_des').hide();
    $('.profile_des').hide();
    $('.complaint_des').hide();
    $('.query_page_des').hide();
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




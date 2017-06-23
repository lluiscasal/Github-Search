window.onload = function () {
    document.getElementById('search_but').addEventListener("click", function () {
        document.getElementById('heading').innerHTML = "";
        document.getElementById('results').innerHTML = "";
        initUser();
        initRepo();
    });
}

function initUser() {
    function loadJSONuser(callback) {
        var showError = true;
        var name = document.getElementById('name').value;
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        //xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
        xobj.open('GET', "https://api.github.com/users/" + name, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
            else if (xobj.status != "200" && showError) {
                //TODO window error
                showError = false;
                var diverror = document.createElement('div');
                diverror.classList.add('error');
                var ptag = document.createElement('p');
                var errormsg = "Does not exist";
                document.getElementById('heading').append(diverror);
                diverror.append(ptag);
                ptag.append(errormsg);
                document.getElementById('heading').style.height = "100px";
                document.getElementById('results').style.boxShadow="0";
            }
        };
        xobj.send(null);
    }
    loadJSONuser(function (response) {
        var user_JSON = JSON.parse(response);
        console.log(user_JSON);
        var headingLeft = document.createElement("div");
        headingLeft.classList.add('headingLeft');
        var divFoto = document.createElement("div");
        divFoto.classList.add('foto');
        divFoto.style.backgroundImage = "url('" + user_JSON.avatar_url + "')";
        headingLeft.append(divFoto);
        var headingRight = document.createElement("div");
        headingRight.setAttribute('id', 'headingRight');
        document.getElementById("heading").append(headingLeft);
        document.getElementById("heading").append(headingRight);
        var divUsername = document.createElement("div");
        divUsername.classList.add('username');
        var username_tag = document.createElement("p");
        var curs = document.createElement("i");
        divUsername.append(username_tag);
        username_tag.append(curs);
        curs.append("@" + user_JSON.login);
        document.getElementById("headingRight").append(divUsername);
        var divFullname = document.createElement("div");
        divFullname.classList.add('fullname');
        var fullname = user_JSON.name;
        var h2tag = document.createElement('h2');
        divFullname.append(h2tag);
        h2tag.append(fullname);
        headingRight.append(divFullname);
        var divBio = document.createElement("div");
        divBio.classList.add('bio');
        var bio = user_JSON.bio;
        var p2tag = document.createElement("p");
        divBio.append(p2tag);
        p2tag.append(bio);
        headingRight.append(divBio);
    });
    document.getElementById("heading").style.height = "150px";
}

function initRepo() {
    function loadJSONrepo(callback) {
        var name = document.getElementById('name').value;
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        //xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
        xobj.open('GET', "https://api.github.com/users/" + name + "/repos", true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }
    loadJSONrepo(function (response) {
        // Parse JSON string into object
        var repo_JSON = JSON.parse(response);
        console.log(repo_JSON);
        document.getElementById('name').value = "";
        var title = document.createElement("h1");
        title.innerHTML = "Repositories";
        var results = document.getElementById("results");
        results.append(title);
        var repoline = document.createElement("div");
        repoline.classList.add('repoline');
        results.append(repoline);
        var allrepos = document.createElement('div');
        allrepos.classList.add('allrepos');
        repo_JSON.forEach(function (value, key) {
            console.log(repo_JSON[key].name);
            var star = document.createElement("img");
            var fork = document.createElement("img");
            star.setAttribute("src", "images/star.jpg");
            fork.setAttribute("src", "images/fork.jpg");
            var divRepo = document.createElement('div');
            divRepo.classList.add('repo');
            divRepo.append(repo_JSON[key].name);
            var divPunt = document.createElement('div');
            divPunt.classList.add('punt');
            divPunt.append(star);
            divPunt.append(repo_JSON[key].stargazers_count);
            divPunt.append(fork);
            divPunt.append(repo_JSON[key].forks_count);
            var eachRepoUp = document.createElement('div');
            eachRepoUp.classList.add('eachRepo_up');
            eachRepoUp.append(divRepo, divPunt);
            var eachRepoDown = document.createElement('div');
            eachRepoDown.classList.add('eachRepo_down');
            var eachRepo = document.createElement('div');
            eachRepo.classList.add('eachRepo');
            eachRepo.append(eachRepoUp);
            eachRepo.append(eachRepoDown);
            allrepos.append(eachRepo);
        });
        results.append(allrepos);
        results.style.paddingBottom = "30px";
    });
}
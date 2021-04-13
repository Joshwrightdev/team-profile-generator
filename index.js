const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer.js");
const Manager = require("./lib/Manager.js");
const Intern = require("./lib/Intern.js");

const employees = [];

function init() {
  generateHtml();
  addNewEmployee();
}

function addNewEmployee() {
  inquirer
    .prompt([
      {
        message: "Enter Employee's Name:",
        name: "name",
      },
      {
        type: "list",
        message: "Select new Team Member's Role",
        choices: ["Engineer", "Intern", "Manager"],
        name: "role",
      },
      {
        message: "Enter new Team Member's ID",
        name: "id",
      },
      {
        message: "Enter team member's email address",
        name: "email",
      },
    ])
    .then(function ({ name, role, id, email }) {
      let roleInfo = "";
      if (role === "Engineer") {
        roleInfo = "GitHub username";
      } else if (role === "Intern") {
        roleInfo = "school name";
      } else {
        roleInfo = "office phone number";
      }
      inquirer
        .prompt([
          {
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo",
          },
          {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["yes", "no"],
            name: "moreMembers",
          },
        ])
        .then(function ({ roleInfo, moreMembers }) {
          let newMember;
          if (role === "Engineer") {
            newMember = new Engineer(name, id, email, roleInfo);
          } else if (role === "Intern") {
            newMember = new Intern(name, id, email, roleInfo);
          } else {
            newMember = new Manager(name, id, email, roleInfo);
          }
          employees.push(newMember);
          generateNewHtml(newMember).then(function () {
            if (moreMembers === "yes") {
              addNewEmployee();
            } else {
              finishHtml();
            }
          });
        });
    });
}
function generateHtml() {
  const generatedHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <title>Team Profile</title>
    </head>
    <body>
  
    `;
  fs.writeFile("./dist/teamprofile.html", generatedHtml, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("newhtml");
}

function generateNewHtml(member) {
  return new Promise(function (res, rej) {
    const name = member.getName();
    const role = member.getRole();
    const id = member.getId();
    const email = member.getEmail();
    let employeeData = "";
    if (role === "Engineer") {
      const github = member.getGithub();
      employeeData = `  <div class="card border-success mb-3" style="max-width: 18rem;">
     <div class="card-header bg-transparent border-success">${name}</div>
     <div class="card-body text-success">
     <h5 class="card-title">${role}</h5>
     <p class="card-text">  <li> ID: ${id}</li>
        <li>Email: ${email}</li>
        <li>Github: ${github}</li></p>
     </div>
     </div>
       `;
    } else if (role === "Intern") {
      const school = member.getSchool();
      employeeData = `  <div class="card border-success mb-3" style="max-width: 18rem;">
     <div class="card-header bg-transparent border-success">${name}</div>
     <div class="card-body text-success">
     <h5 class="card-title">${role}</h5>
     <p class="card-text">  <li> ID: ${id}</li>
        <li>Email: ${email}</li>
        <li>School: ${school}</li></p>
     </div>
     </div>
       `;
    } else {
      const officePhone = member.getOfficeNumber();
      employeeData = `  <div class="card border-success mb-3" style="max-width: 18rem;">
     <div class="card-header bg-transparent border-success">${name}</div>
     <div class="card-body text-success">
     <h5 class="card-title">${role}</h5>
     <p class="card-text">  <li> ID: ${id}</li>
        <li>Email: ${email}</li>
        <li>Office Phone: ${officePhone}</li></p>
     </div>
     </div>
       `;
    }
    fs.appendFile("./dist/teamprofile.html", employeeData, function (err) {
      if (err) {
        return rej(err);
      }
      return res();
    });
  });
}
function finishHtml() {
  const html = ` 
</body>
</html>`;

  fs.appendFile("./dist/teamprofile.html", html, function (err) {
    if (err) {
    }
  });
}
init();

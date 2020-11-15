# Welecome to job-track
#### a super light job-tracking app

to run this developement:

`git clone https://www.github.com/ExtraLime/job-track.git`

then

`cd job-track && npm run dev`

This demo app uses a MERN stack with a bucketeer bucket for file storage and download and eventually for image hosting. 
All credentials stored in config/default.json (You need your own mongo URI and bucketeer(AWS) bucket).

Users can register as an owner or a contractor.
- Owners can create jobs
 - Contractors can add updates and close jobs
## To-do
 - Add profile details with image
 - require a closing note when setting status to close for contractors
 - BackEnd - prevent duplicate entries to contractor connections. user connections should throw error
 - configure errors and alerts
 - build out admin platform to add/delete from db
 - build testing
 - add input validation, sanitization
## Known Issues
- select elements do not set/reset properly in modals
- adding update sets all dates to current update
- if owner adds a third+ job, scrolling requires refresh, maybe create pages?
- select does not show on registration page until refresh
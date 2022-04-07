module.exports = {
  GET_ISSUES_BY_VISIT_ID:
  "SELECT " +
  "issues.id as issueId, " +
  "issues.description, " +
  "issues.startTime, " +
  "issues.endTime, " +
  "issues.price, " +
  "specialist.id as specialistId, " +
  "specialist.experience, specialist.isBusy, " +
  "speciality.id as speicalityId, " +
  "speciality.name, " +
  "worker.id as workerId, " +
  "worker.firstName, " +
  "worker.lastName, " +
  "worker.fatherName " +
  "FROM issues, user_visit, specialist, worker, speciality " +
  "WHERE issues.id_user_visit = ? AND user_visit.status = ? AND " +
  "issues.id_user_visit = user_visit.id AND " +
  "issues.id_specialist = specialist.id AND " +
  "specialist.id_worker = worker.id AND " +
  "specialist.id_speciality = speciality.id",

};

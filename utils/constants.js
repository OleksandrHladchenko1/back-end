module.exports = {
  GET_ISSUES_BY_VISIT_ID:
    "SELECT " +
    "issues.id as issueId, " +
    "issues.description, " +
    "issues.startTime, " +
    "issues.endTime, " +
    "issues.price, " +
    "issues.closed, " +
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
  EDIT_SPECIALIST: 
    "UPDATE specialist " +
    "SET isBusy = ?, startTime = ?, endTime = ? " +
    "WHERE id = ?",
  ADD_SPECIALIST: 
    "INSERT INTO specialist " +
    "(id_worker, id_speciality, experience, isBusy) " +
    "VALUES ?",
  DELETE_SPECIALIST:
    "DELETE FROM specialist WHERE id_worker = ? AND id_speciality = ?",
  ADD_ISSUE: 
    "INSERT INTO issues " +
    "(id_user_visit, id_specialist, description, startTime, endTime, price, closed) " +
    "VALUES ?",
  DELETE_ISSUE:
    "DELETE FROM issues WHERE id = ?",
  CLOSE_ISSUE:
    "UPDATE issues SET closed = 'Yes' WHERE id = ?",
  GET_WORKER_SPECIALITIES:
    "SELECT speciality.id, speciality.name FROM speciality, specialist, worker " +
    "WHERE worker.id = specialist.id_worker AND " +
    "specialist.id_speciality = speciality.id AND " +
    "worker.id = ?",
  GET_ALL_SPECIALITIES:
    "SELECT * FROM speciality",
};

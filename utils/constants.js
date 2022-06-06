module.exports = {
  GET_VISIT_ISSUES_BEFORE_SORT:
    "SELECT * FROM issues WHERE id_user_visit = ?",
  GET_ISSUES_BY_VISIT_ID:
    "SELECT " +
    "issues.id as issueId, " +
    "issues.description, " +
    "issues.startTime, " +
    "issues.endTime, " +
    "issues.price, " +
    "issues.closed, " +
    "specialist.id as specialistId, " +
    "specialist.experience, " +
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
    "(id_worker, id_speciality, experience) " +
    "VALUES ?",
  DELETE_SPECIALIST:
    "DELETE FROM specialist WHERE id_worker = ? AND id_speciality = ?",
  ADD_ISSUE: 
    "INSERT INTO issues " +
    "(id_user_visit, description, price, closed, degree, dependsOn) " +
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
  GET_VISIT_BY_ID:
    "SELECT user_visit.dateOfVisit, user_visit.id_car, user_visit.status, user_visit.isSorted, " +
    "user.phoneNumber, user.firstName, user.lastName, user.fatherName, user.dateOfBirth, user.discount, user.email, " +
    "user_car.name, user_car.model, user_car.color, user_car.year, user_car.carcas, user_car.engine, user_car.number, user_car.transmission, user_car.engineNumber " +
    "FROM user_visit, user, user_car " +
    "WHERE user_visit.id_user = user.id AND user_visit.id_car = user_car.id AND user_visit.id = ?",
  GET_FREE_WORKERS_FOR_TIME:
    "SELECT " +
    "specialist.id AS specialistId, " +
    "worker.id AS workerId, " +
    "worker.firstName, " +
    "worker.lastName, " +
    "worker.fatherName, " +
    "worker.phoneNumber, " +
    "specialist.experience, " +
    "speciality.name AS speciality " +
    "FROM worker, specialist, speciality WHERE " +
    "specialist.id NOT IN ( " +
    "SELECT specialist.id FROM specialist, issues WHERE " +
    "(DATE(issues.startTime) >= ? AND DATE(issues.startTime) <= ? OR " +
    "DATE(issues.endTime) >= ? AND DATE(issues.endTime) <= ?) AND issues.id_specialist = specialist.id " +
    "AND issues.closed != 'Yes') " +
    "AND worker.id = specialist.id_worker AND specialist.id_speciality = speciality.id",
  GET_FREE_WORKERS_FOR_PROBLEM:
    "SELECT " +
    "specialist.id AS specialistId, " +
    "worker.id AS workerId, " +
    "worker.firstName, " +
    "worker.lastName, " +
    "worker.fatherName, " +
    "worker.phoneNumber, " +
    "specialist.experience, " +
    "problem_type.name, " +
    "speciality.name AS speciality " +
    "FROM worker, specialist, speciality, problem_type WHERE " +
    "problem_type.id = specialist.id_problem_type AND " +
    "worker.id = specialist.id_worker AND " +
    "speciality.id = specialist.id_speciality AND " +
    "id_problem_type = ?",
  GET_WORKLOAD:
    "SELECT " +
    "SUM(timestampdiff(MINUTE, issues.startTime, issues.endTime)) AS workload, " +
    "issues.id_specialist, " +
    "worker.firstName, " +
    "worker.lastName, " +
    "worker.fatherName, " +
    "worker.id, " +
    "speciality.name " +
    "FROM issues, specialist, worker, speciality " +
    "WHERE issues.closed = 'Yes' AND " +
    "issues.id_specialist = specialist.id AND " +
    "specialist.id_worker = worker.id AND " +
    "specialist.id_speciality = speciality.id " +
    "group by issues.id_specialist",
  GET_PROBLEM_STATISTICS: 
  "SELECT " + 
	"COUNT(specialist.id) as count, " + 
	"problem_type.name, " + 
  "problem_type.id " +
  "FROM specialist, problem_type, issues " + 
	"WHERE specialist.id_problem_type = problem_type.id AND issues.id_specialist = specialist.id " + 
	"GROUP BY id_problem_type ",
  GET_FREE_VISITS: 
    "SELECT COUNT(id) as visitsAmount FROM user_visit WHERE " +
    "(? >= dateOfVisit AND ? < date_add(dateOfVisit, INTERVAL 1 HOUR) OR " +
    "date_add(?, INTERVAL 1 HOUR) < date_add(dateOfVisit, INTERVAL 1 HOUR) AND date_add(?, INTERVAL 1 HOUR)  >= dateOfVisit) AND " +
    "status = 'Planned'",
  DELETE_VISIT: 
    "DELETE FROM user_visit WHERE id = ?",
  GET_PROBLEM_TYPES: 
    "SELECT * FROM problem_type",
  UPDATE_DEPENDENCY:
    "UPDATE issues SET degree = ?, dependsOn = ? WHERE id = ?",
  GET_SORTED_ISSUES:
    "SELECT * FROM issues ORDER BY sequence",
  SET_SORTED:
    "UPDATE user_visit SET isSorted = 'Yes' WHERE id = ?",
  UPDATE_START_END_SPECIALIST:
    "UPDATE issues SET id_specialist = ?, startTime = ?, endTime = ? WHERE id = ?"
};

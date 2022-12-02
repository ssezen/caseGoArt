let chai = require("chai");
let chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);
let url = "http://localhost:5005";

describe("User", () => {
  describe("POST /addUser", () => {
    it("it should POST a new user", (done) => {
      let user = {
        name: "Halit",
        surname: "Kır",
        phone: "05323457865",
        email: "halit@gmail.com",
      };

      chai
        .request(url)
        .post("/user/addUser")
        .send(user)
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});

describe("Wallet", () => {
  describe("POST /addWallet", () => {
    it("it should POST a new wallet", (done) => {
      let wallet = {
        userId: "638954b35aaf84efd3e1e5c2",
        nameWallet: "Salary",
      };

      chai
        .request(url)
        .post("/wallet/addWallet")
        .send(wallet)
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("PATCH /addBalance", () => {
    it("it should PATCH a new balance", (done) => {
      let balance = {
        walletId: "638954cd5aaf84efd3e1e5c4",
        amount: 1500,
        currency: "GBP",
      };

      chai
        .request(url)
        .patch("/wallet/addBalance")
        .send(balance)
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("PATCH /listBalance", () => {
    it("it should GET list balance", (done) => {
      let balance = {
        walletId: "638954cd5aaf84efd3e1e5c4",
      };

      chai
        .request(url)
        .get("/wallet/listBalance")
        .send(balance)
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("PATCH /deposit", () => {
    it("it should PATCH deposit", (done) => {
      let deposit = {
        userId: "63866349645b5eec2fb3bfe6",
        walletId: "638954cd5aaf84efd3e1e5c4",
        balanceId: "6389575b31546a071c7930b7",
        amount: 50,
      };

      chai
        .request(url)
        .patch("/wallet/deposit")
        .send(deposit)
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("PATCH /withdraw", () => {
    it("it should PATCH withdraw", (done) => {
      let withdraw = {
        userId: "63866349645b5eec2fb3bfe6",
        walletId: "638954cd5aaf84efd3e1e5c4",
        balanceId: "6389575b31546a071c7930b7",
        amount: 50,
      };

      chai
        .request(url)
        .patch("/wallet/withdraw")
        .send(withdraw)
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("POST /addTransaction", () => {
    it("it should POST a new transaction", (done) => {
      let transaction = {
        userId: "63866349645b5eec2fb3bfe6",
        walletId: "638954cd5aaf84efd3e1e5c4",
        balanceId: "6389575b31546a071c7930b7",
        process: {
          typeProcess: "deposit",
          amount: 30,
        },
      };

      chai
        .request(url)
        .post("/transaction/addTransaction")
        .send(transaction)
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("POST /listTransactions", () => {
    it("it should GET list transactions", (done) => {
      let transaction = {
        walletId: "638954cd5aaf84efd3e1e5c4",
      };

      chai
        .request(url)
        .get("/transaction/listTransactions")
        .send(transaction)
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
});

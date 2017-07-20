import chai from 'chai';
import chaiThings from 'chai-things';
import chaiSorted from 'chai-sorted';
import chaiImmutable from 'chai-immutable';
import chaiDatetime from 'chai-datetime';

chai.use(chaiDatetime);
chai.should();
chai.use(chaiThings);
chai.use(chaiImmutable);
chai.use(chaiSorted);

const { expect } = chai;

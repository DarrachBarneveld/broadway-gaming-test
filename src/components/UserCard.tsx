import { FunctionComponent } from "react";
import "./UserCard.css";
import { FaMedal, FaPhone, FaStar } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export type User = {
  score: number;
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: null | string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

interface UserCardProps {
  user: User;
  index: number;
}

const UserCard: FunctionComponent<UserCardProps> = ({ user, index }) => {
  return (
    <article className="card fade-in-up">
      <div className="card-bio">
        <div className="points">
          <FaMedal /> {index + 1}
        </div>
        <img className="img-avatar" src={user.picture.large} />

        <div className="points">
          <FaStar />
          {user.score}
        </div>
      </div>
      <div className="card-text">
        <div className="joined">
          <span>Joined: </span>
          {new Date(user.registered.date).toLocaleDateString()}
        </div>
        <h2>
          {user.name.title} {user.name.first} {user.name.last}
        </h2>
        <div className="summary">
          <div className="summary-item">
            <span>Age</span>
            <p>{user.dob.age}</p>
          </div>
          <div className="summary-item">
            <span>Gender</span>
            <p>{user.gender.split("")[0]}</p>
          </div>
          <div className="summary-item">
            <span>Country</span>
            <p>{user.location.country}</p>
          </div>
        </div>

        <div className="contact">
          <div className="contact-item">
            <FaPhone /> <a href={`tel:${user.phone}`}>{user.phone}</a>
          </div>
          <div className="contact-item">
            <MdEmail />
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </div>
        </div>

        <address className="location">
          <p>
            <span>Street:</span> {user.location.street.number}{" "}
            {user.location.street.name},
          </p>
          <p>
            <span>City:</span> {user.location.city}
          </p>
          <p>
            <span>State:</span> {user.location.state}
          </p>
          <p>
            <span>Country:</span> {user.location.country}
          </p>
          <p>
            <span>Postcode:</span> {user.location.postcode}
          </p>
          <p>
            <span>Timezone:</span> {user.location.timezone.offset}
          </p>
        </address>
      </div>
    </article>
  );
};

export default UserCard;

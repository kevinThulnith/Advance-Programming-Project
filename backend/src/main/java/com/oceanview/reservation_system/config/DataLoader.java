package com.oceanview.reservation_system.config;

import com.oceanview.reservation_system.model.Reservation;
import com.oceanview.reservation_system.model.Reservation.ReservationStatus;
import com.oceanview.reservation_system.model.Role;
import com.oceanview.reservation_system.model.Room;
import com.oceanview.reservation_system.model.Room.RoomType;
import com.oceanview.reservation_system.model.User;
import com.oceanview.reservation_system.repository.ReservationRepository;
import com.oceanview.reservation_system.repository.RoomRepository;
import com.oceanview.reservation_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already seeded — skipping DataLoader.");
            return;
        }

        log.info("Seeding database with dummy data...");

        // ── Users ─────────────────────────────────────────────────────────────
        User admin = userRepository.save(User.builder()
                .username("admin")
                .password(passwordEncoder.encode("admin123"))
                .fullName("Admin User")
                .email("admin@oceanview.com")
                .phoneNumber("+1234567890")
                .roles(Set.of(Role.ROLE_ADMIN, Role.ROLE_USER))
                .build());

        User alice = userRepository.save(User.builder()
                .username("alice")
                .password(passwordEncoder.encode("alice123"))
                .fullName("Alice Johnson")
                .email("alice@example.com")
                .phoneNumber("+1987654321")
                .roles(Set.of(Role.ROLE_USER))
                .build());

        User bob = userRepository.save(User.builder()
                .username("bob")
                .password(passwordEncoder.encode("bob12345"))
                .fullName("Bob Smith")
                .email("bob@example.com")
                .phoneNumber("+1122334455")
                .roles(Set.of(Role.ROLE_USER))
                .build());

        User carol = userRepository.save(User.builder()
                .username("carol")
                .password(passwordEncoder.encode("carol123"))
                .fullName("Carol White")
                .email("carol@example.com")
                .phoneNumber("+1555666777")
                .roles(Set.of(Role.ROLE_USER))
                .build());

        User david = userRepository.save(User.builder()
                .username("david")
                .password(passwordEncoder.encode("david123"))
                .fullName("David Brown")
                .email("david@example.com")
                .phoneNumber("+1444333222")
                .roles(Set.of(Role.ROLE_USER))
                .build());

        log.info("Created {} users.", userRepository.count());

        // ── Rooms ─────────────────────────────────────────────────────────────
        Room r101 = roomRepository.save(Room.builder()
                .roomNumber("101")
                .roomType(RoomType.SINGLE)
                .description("Cozy single room with a garden view. Perfect for solo travelers seeking comfort and peace.")
                .imageUrl("https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800")
                .floor(1)
                .maxOccupancy(1)
                .pricePerNight(new BigDecimal("80.00"))
                .available(true)
                .build());

        Room r102 = roomRepository.save(Room.builder()
                .roomNumber("102")
                .roomType(RoomType.SINGLE)
                .description("Bright single room with a pool-view balcony. Ideal for business travelers.")
                .imageUrl("https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800")
                .floor(1)
                .maxOccupancy(1)
                .pricePerNight(new BigDecimal("80.00"))
                .available(true)
                .build());

        Room r201 = roomRepository.save(Room.builder()
                .roomNumber("201")
                .roomType(RoomType.DOUBLE)
                .description("Spacious double room with a king-size bed and city view. Great for couples.")
                .imageUrl("https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800")
                .floor(2)
                .maxOccupancy(2)
                .pricePerNight(new BigDecimal("120.00"))
                .available(true)
                .build());

        Room r202 = roomRepository.save(Room.builder()
                .roomNumber("202")
                .roomType(RoomType.DOUBLE)
                .description("Modern double room with two queen beds and a private terrace.")
                .imageUrl("https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800")
                .floor(2)
                .maxOccupancy(2)
                .pricePerNight(new BigDecimal("120.00"))
                .available(false)
                .build());

        Room r301 = roomRepository.save(Room.builder()
                .roomNumber("301")
                .roomType(RoomType.SUITE)
                .description("Elegant suite with a separate living area and ocean-view jacuzzi. An unforgettable experience.")
                .imageUrl("https://images.unsplash.com/photo-1591088398332-8596b4524e8a?w=800")
                .floor(3)
                .maxOccupancy(2)
                .pricePerNight(new BigDecimal("200.00"))
                .available(true)
                .build());

        Room r302 = roomRepository.save(Room.builder()
                .roomNumber("302")
                .roomType(RoomType.SUITE)
                .description("Luxury suite with a panoramic sea view, plush furnishings, and gourmet mini-bar.")
                .imageUrl("https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800")
                .floor(3)
                .maxOccupancy(2)
                .pricePerNight(new BigDecimal("200.00"))
                .available(true)
                .build());

        Room r401 = roomRepository.save(Room.builder()
                .roomNumber("401")
                .roomType(RoomType.DELUXE)
                .description("Deluxe king room with a full ocean view, premium bedding, and a private butler service.")
                .imageUrl("https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800")
                .floor(4)
                .maxOccupancy(3)
                .pricePerNight(new BigDecimal("300.00"))
                .available(true)
                .build());

        Room r402 = roomRepository.save(Room.builder()
                .roomNumber("402")
                .roomType(RoomType.DELUXE)
                .description("Stunning deluxe room with a wrap-around balcony, rainfall shower, and sunset views.")
                .imageUrl("https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800")
                .floor(4)
                .maxOccupancy(3)
                .pricePerNight(new BigDecimal("300.00"))
                .available(true)
                .build());

        Room r501 = roomRepository.save(Room.builder()
                .roomNumber("501")
                .roomType(RoomType.PENTHOUSE)
                .description("The crown jewel of OceanView — a full-floor penthouse with a private pool, chef's kitchen, and 360° ocean panorama.")
                .imageUrl("https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800")
                .floor(5)
                .maxOccupancy(4)
                .pricePerNight(new BigDecimal("500.00"))
                .available(true)
                .build());

        Room r502 = roomRepository.save(Room.builder()
                .roomNumber("502")
                .roomType(RoomType.PENTHOUSE)
                .description("Exclusive penthouse with a rooftop terrace, private cinema, and concierge access 24/7.")
                .imageUrl("https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800")
                .floor(5)
                .maxOccupancy(4)
                .pricePerNight(new BigDecimal("500.00"))
                .available(false)
                .build());

        log.info("Created {} rooms.", roomRepository.count());

        // ── Reservations ──────────────────────────────────────────────────────
        // Past – CHECKED_OUT
        reservationRepository.save(Reservation.builder()
                .user(alice)
                .room(r201)
                .guestName("Alice Johnson")
                .guestAddress("45 Maple Street, New York, NY 10001")
                .contactNumber("+1987654321")
                .checkInDate(LocalDate.of(2026, 1, 10))
                .checkOutDate(LocalDate.of(2026, 1, 15))
                .totalCost(new BigDecimal("600.00"))
                .status(ReservationStatus.CHECKED_OUT)
                .build());

        reservationRepository.save(Reservation.builder()
                .user(bob)
                .room(r301)
                .guestName("Bob Smith")
                .guestAddress("12 Oak Avenue, Los Angeles, CA 90001")
                .contactNumber("+1122334455")
                .checkInDate(LocalDate.of(2026, 1, 20))
                .checkOutDate(LocalDate.of(2026, 1, 25))
                .totalCost(new BigDecimal("1000.00"))
                .status(ReservationStatus.CHECKED_OUT)
                .build());

        // Past – CANCELLED
        reservationRepository.save(Reservation.builder()
                .user(carol)
                .room(r101)
                .guestName("Carol White")
                .guestAddress("88 Pine Road, Chicago, IL 60601")
                .contactNumber("+1555666777")
                .checkInDate(LocalDate.of(2026, 2, 5))
                .checkOutDate(LocalDate.of(2026, 2, 8))
                .totalCost(new BigDecimal("240.00"))
                .status(ReservationStatus.CANCELLED)
                .build());

        // Ongoing – CONFIRMED
        reservationRepository.save(Reservation.builder()
                .user(alice)
                .room(r401)
                .guestName("Alice Johnson")
                .guestAddress("45 Maple Street, New York, NY 10001")
                .contactNumber("+1987654321")
                .checkInDate(LocalDate.of(2026, 2, 28))
                .checkOutDate(LocalDate.of(2026, 3, 5))
                .totalCost(new BigDecimal("1800.00"))
                .status(ReservationStatus.CONFIRMED)
                .build());

        reservationRepository.save(Reservation.builder()
                .user(david)
                .room(r502)
                .guestName("David Brown")
                .guestAddress("3 Birch Lane, Miami, FL 33101")
                .contactNumber("+1444333222")
                .checkInDate(LocalDate.of(2026, 2, 27))
                .checkOutDate(LocalDate.of(2026, 3, 3))
                .totalCost(new BigDecimal("2000.00"))
                .status(ReservationStatus.CONFIRMED)
                .build());

        // Future – PENDING
        reservationRepository.save(Reservation.builder()
                .user(bob)
                .room(r202)
                .guestName("Bob Smith")
                .guestAddress("12 Oak Avenue, Los Angeles, CA 90001")
                .contactNumber("+1122334455")
                .checkInDate(LocalDate.of(2026, 3, 10))
                .checkOutDate(LocalDate.of(2026, 3, 14))
                .totalCost(new BigDecimal("480.00"))
                .status(ReservationStatus.PENDING)
                .build());

        reservationRepository.save(Reservation.builder()
                .user(carol)
                .room(r302)
                .guestName("Carol White")
                .guestAddress("88 Pine Road, Chicago, IL 60601")
                .contactNumber("+1555666777")
                .checkInDate(LocalDate.of(2026, 3, 15))
                .checkOutDate(LocalDate.of(2026, 3, 20))
                .totalCost(new BigDecimal("1000.00"))
                .status(ReservationStatus.PENDING)
                .build());

        reservationRepository.save(Reservation.builder()
                .user(david)
                .room(r402)
                .guestName("David Brown")
                .guestAddress("3 Birch Lane, Miami, FL 33101")
                .contactNumber("+1444333222")
                .checkInDate(LocalDate.of(2026, 4, 1))
                .checkOutDate(LocalDate.of(2026, 4, 5))
                .totalCost(new BigDecimal("1200.00"))
                .status(ReservationStatus.PENDING)
                .build());

        log.info("Created {} reservations.", reservationRepository.count());
        log.info("✅ Database seeded successfully!");
        log.info("─────────────────────────────────────────");
        log.info("  Admin login  →  admin / admin123");
        log.info("  User logins  →  alice / alice123");
        log.info("               →  bob   / bob12345");
        log.info("               →  carol / carol123");
        log.info("               →  david / david123");
        log.info("─────────────────────────────────────────");
    }
}

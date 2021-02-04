package com.web.freshdate.webutils;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;


import com.web.freshdate.model.Item;
import com.web.freshdate.model.User;
import com.web.freshdate.repository.ItemRepository;
import com.web.freshdate.repository.UserRepository;

@Component
@Transactional
public class EmailManager {

	@Autowired
	private JavaMailSender sender;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	HttpServletRequest request;


	@Autowired
	private ItemRepository itemRepository;

	public void sendMail(String to, String msg, String subject) throws MessagingException {
		
		System.out.println("to=" + to + " msg= "+msg + " subject= " + subject);
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setFrom("makeitfresh@freshdate.com");
		helper.setTo(to);
		helper.setText(msg);
		helper.setSubject(subject);
		sender.send(message);

	}


}
